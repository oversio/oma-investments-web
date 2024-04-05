import { classMerge } from "../../utils/class-merge";

interface DropzoneHelperMessageProps {
  helperMessage: string | string[] | undefined;
  isError: boolean;
}

export function DropzoneHelperMessage({ helperMessage, isError }: DropzoneHelperMessageProps) {
  return helperMessage ? (
    <p className={classMerge("text-sm mt-2 text-gray-500", isError ? "text-red-700" : "")}>
      {Array.isArray(helperMessage) ? (
        <ul className=" list-disc px-4">
          {helperMessage.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        helperMessage
      )}
    </p>
  ) : null;
}
