import { describe, expect, it } from "vitest";
import { getCurrentPageFromSearchParams } from "./pagination.utils";

describe("getCurrentPageFromSearchParams", () => {
  it("defaults to page 1 when no page parameter is provided", () => {
    expect(getCurrentPageFromSearchParams(undefined)).toBe(1);
  });

  it("parses a numeric page parameter from a string", () => {
    expect(getCurrentPageFromSearchParams("3")).toBe(3);
  });

  it("parses the first value from an array of page values", () => {
    expect(getCurrentPageFromSearchParams(["4", "5"])).toBe(4);
  });

  it("falls back to page 1 for invalid values", () => {
    expect(getCurrentPageFromSearchParams("invalid")).toBe(1);
  });
});
