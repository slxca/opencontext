export const SERVER_NAME = "opencontext-mcp";
export const SERVER_VERSION = "0.1.0";
export const CONTEXT_DIRECTORY_NAME = ".opencontext";
export const TOPIC_PATTERN = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/;

export class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserInputError";
  }
}

export function textResult(text: string, isError = false) {
  return {
    content: [
      {
        type: "text" as const,
        text,
      },
    ],
    ...(isError ? { isError: true } : {}),
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
}

export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
