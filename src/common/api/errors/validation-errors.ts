import { i18n } from "../../i18n/i18n-provider";
import { isTranslationKey } from "../../i18n/utils/is-translation-key";

type ValidationError = {
  code: number;
  message: string;
};

export class ValidationErrors {
  private _fieldErrors: Record<string, ValidationError[]> = {};
  private _generalErrors: ValidationError[] = [];

  addGeneralError(code: number, message: string) {
    this._generalErrors.push({ code, message });
  }

  get generalErrors() {
    return this._generalErrors;
  }

  get hasGeneralErrors() {
    return Boolean(this._generalErrors.length);
  }

  get generalErrorsMessage() {
    return ValidationErrors._validationErrorMessage(this._generalErrors);
  }

  get fieldsWithErrors() {
    return Object.keys(this._fieldErrors);
  }

  addFieldError(fieldName: string, code: number, message: string) {
    if (!this._fieldErrors[fieldName]) {
      this._fieldErrors[fieldName] = [];
    }

    this._fieldErrors[fieldName].push({ code, message });
  }

  fieldErrors(fieldName: string): ValidationError[] | undefined {
    return this._fieldErrors[fieldName];
  }

  hasFieldErrors(fieldName?: string) {
    return Boolean(fieldName ? this.fieldErrors(fieldName)?.length : Object.keys(this._fieldErrors).length);
  }

  fieldErrorsMessage(fieldName: string) {
    return ValidationErrors._validationErrorMessage(this.fieldErrors(fieldName));
  }

  private static _validationErrorMessage(errors: ValidationError[] | undefined) {
    return errors
      ?.map(error => {
        const key = `server-validation.${error.code}`;
        return isTranslationKey(key) ? i18n.intl.formatMessage({ id: key }) : error.message;
      })
      .join(", ");
  }
}
