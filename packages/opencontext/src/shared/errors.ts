/**
 * Custom error for user input validation problems.
 * Thrown when topic names, content, or other user inputs fail validation.
 */
export class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserInputError";
  }
}

/**
 * Safely extracts an error message from unknown error types.
 * Handles Error objects, strings, and any other unexpected value.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
}

/**
 * Type guard for Node.js filesystem errors.
 * Lets callers distinguish ENOENT, EACCES, etc. from other failures.
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}