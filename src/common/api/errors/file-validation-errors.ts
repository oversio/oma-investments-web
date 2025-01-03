import { i18n } from "../../i18n/i18n-provider";
import { isTranslationKey } from "../../i18n/utils/is-translation-key";

type FileValidationError<TRowColumns extends object, TProperty = keyof TRowColumns> = TRowColumns & {
  line: number;
  errors: Array<{ code: string; message: string; property: TProperty }>;
};
export class FileValidationErrors {
  private _fileErrors: FileValidationError<Record<string, unknown>>[] = [];

  constructor(fileErrors: object[]) {
    this._fileErrors = fileErrors as FileValidationError<Record<string, unknown>>[];
  }

  getRowErrors() {
    return this._fileErrors.map(row => {
      return {
        line: row.line,
        errors: row.errors.map(error => {
          const code = error.message === "Required" ? "required" : error.code;
          const key = `server-validation.file-column.${code}`;
          const { property, expected, value } = this._extractExpectedValue(row, error);
          if (isTranslationKey(key)) {
            return i18n.intl.formatMessage({ id: key }, { column: property, value, expected });
          }

          return i18n.intl.formatMessage(
            { id: "server-validation.file-column.unknown" },
            { column: property, value },
          );
        }),
      };
    });
  }

  _extractExpectedValue(
    row: FileValidationError<Record<string, unknown>>,
    error: { code: string; message: string; property: string },
  ) {
    if (error.code === "invalid_enum_value") {
      const value = row[error.property] ?? "";
      const enumValue = error.message
        .match(/Expected\s+([^,]+)/)?.[1]
        .replace(/'/g, "")
        .split("|")
        .map(v => v.trim())
        .join(", ");

      return { expected: enumValue, value: value as string, property: error.property };
    }

    return { value: (row[error.property] ?? "") as string, property: error.property };
  }
}
