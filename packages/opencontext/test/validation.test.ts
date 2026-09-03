import { describe, it, expect } from "vitest";
import { validateTopic } from "../src/validation/index.js";
import { UserInputError } from "../src/shared/errors.js";

describe("validateTopic", () => {
  it("returns trimmed topic for valid snake_case", () => {
    expect(validateTopic("api_contracts")).toBe("api_contracts");
  });

  it("returns trimmed topic for valid kebab-case", () => {
    expect(validateTopic("auth-rules")).toBe("auth-rules");
  });

  it("returns trimmed topic for single lowercase word", () => {
    expect(validateTopic("architecture")).toBe("architecture");
  });

  it("returns trimmed topic for mixed case with numbers", () => {
    expect(validateTopic("migration-v2")).toBe("migration-v2");
  });

  it("trims whitespace", () => {
    expect(validateTopic("  coding_rules  ")).toBe("coding_rules");
  });

  it("throws UserInputError for empty string", () => {
    expect(() => validateTopic("")).toThrow(UserInputError);
  });

  it("throws UserInputError for whitespace-only string", () => {
    expect(() => validateTopic("   ")).toThrow(UserInputError);
  });

  it("throws UserInputError for uppercase letters", () => {
    expect(() => validateTopic("API_Contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for spaces in topic", () => {
    expect(() => validateTopic("api contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for dots", () => {
    expect(() => validateTopic("api.contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for special characters", () => {
    expect(() => validateTopic("api@contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for double hyphens", () => {
    expect(() => validateTopic("api--contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for leading hyphen", () => {
    expect(() => validateTopic("-api-contracts")).toThrow(UserInputError);
  });

  it("throws UserInputError for trailing underscore", () => {
    expect(() => validateTopic("api_contracts_")).toThrow(UserInputError);
  });
});
