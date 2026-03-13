import { cleanFullResponse } from "@/ipc/utils/cleanFullResponse";
import { describe, it, expect } from "vitest";

describe("cleanFullResponse", () => {
  it("should replace < characters in serene-write attributes", () => {
    const input = `<serene-write path="src/file.tsx" description="Testing <a> tags.">content</serene-write>`;
    const expected = `<serene-write path="src/file.tsx" description="Testing ＜a＞ tags.">content</serene-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should replace < characters in multiple attributes", () => {
    const input = `<serene-write path="src/<component>.tsx" description="Testing <div> tags.">content</serene-write>`;
    const expected = `<serene-write path="src/＜component＞.tsx" description="Testing ＜div＞ tags.">content</serene-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle multiple nested HTML tags in a single attribute", () => {
    const input = `<serene-write path="src/file.tsx" description="Testing <div> and <span> and <a> tags.">content</serene-write>`;
    const expected = `<serene-write path="src/file.tsx" description="Testing ＜div＞ and ＜span＞ and ＜a＞ tags.">content</serene-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle complex example with mixed content", () => {
    const input = `
      BEFORE TAG
  <serene-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use <a> tags.">
import React from 'react';
</serene-write>
AFTER TAG
    `;

    const expected = `
      BEFORE TAG
  <serene-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use ＜a＞ tags.">
import React from 'react';
</serene-write>
AFTER TAG
    `;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle other serene tag types", () => {
    const input = `<serene-rename from="src/<old>.tsx" to="src/<new>.tsx"></serene-rename>`;
    const expected = `<serene-rename from="src/＜old＞.tsx" to="src/＜new＞.tsx"></serene-rename>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle serene-delete tags", () => {
    const input = `<serene-delete path="src/<component>.tsx"></serene-delete>`;
    const expected = `<serene-delete path="src/＜component＞.tsx"></serene-delete>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should not affect content outside serene tags", () => {
    const input = `Some text with <regular> HTML tags. <serene-write path="test.tsx" description="With <nested> tags.">content</serene-write> More <html> here.`;
    const expected = `Some text with <regular> HTML tags. <serene-write path="test.tsx" description="With ＜nested＞ tags.">content</serene-write> More <html> here.`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle empty attributes", () => {
    const input = `<serene-write path="src/file.tsx">content</serene-write>`;
    const expected = `<serene-write path="src/file.tsx">content</serene-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle attributes without < characters", () => {
    const input = `<serene-write path="src/file.tsx" description="Normal description">content</serene-write>`;
    const expected = `<serene-write path="src/file.tsx" description="Normal description">content</serene-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });
});
