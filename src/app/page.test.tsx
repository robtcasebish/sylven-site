import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

function renderedText() {
  return renderToStaticMarkup(<HomePage />)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

describe("homepage product boundaries", () => {
  it("does not present Sylven as a healthcare or medical service", () => {
    const text = renderedText();

    expect(text).toContain("Sylven is not a healthcare provider");
    expect(text).not.toMatch(/Sylven is a healthcare provider/i);
    expect(text).not.toMatch(/Sylven is a pharmacy/i);
    expect(text).not.toMatch(/Sylven (?:provides|issues|fills) prescriptions/i);
    expect(text).not.toMatch(/Sylven is a medical assessment service/i);
  });

  it("presents the national vision and the pilot honestly", () => {
    const text = renderedText();

    expect(text).toContain("Metro Vancouver pilot");
    expect(text).toContain("Canada-wide vision");
    expect(text).toContain("Every public clinic fact needs provenance");
    expect(text).not.toMatch(/best clinic|top-rated|guaranteed appointment/i);
  });
});
