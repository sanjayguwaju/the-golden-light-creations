import { describe, expect, it } from "vitest";
import { getCurrentPageFromSearchParams } from "../../src/app/(frontend)/[locale]/posts/pagination.utils";

describe("posts pagination query parsing", () => {
  it("defaults to page 1 when there is no page parameter", () => {
    expect(getCurrentPageFromSearchParams(undefined)).toBe(1);
  });

  it("reads the requested page from the URL query", () => {
    expect(getCurrentPageFromSearchParams("3")).toBe(3);
  });

  it("uses the first value from an array of query params", () => {
    expect(getCurrentPageFromSearchParams(["4", "5"])).toBe(4);
  });
});
