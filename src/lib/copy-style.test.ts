import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const publicCopyRoots = [
  resolve("src/app"),
  resolve("src/components"),
  resolve("src/lib/clinic-directory.ts"),
  resolve("src/lib/directory.ts"),
];

function sourceFiles(path: string): string[] {
  if (!statSync(path).isDirectory()) return [path];

  return readdirSync(path).flatMap((entry) => sourceFiles(join(path, entry)));
}

describe("public copy style", () => {
  it("does not use em dashes", () => {
    const violations = publicCopyRoots
      .flatMap(sourceFiles)
      .filter((path) => [".ts", ".tsx"].includes(extname(path)))
      .filter((path) => !path.endsWith("copy-style.test.ts"))
      .filter((path) => /\u2014|&mdash;/i.test(readFileSync(path, "utf8")));

    expect(violations).toEqual([]);
  });
});
