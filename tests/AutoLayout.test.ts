import * as core from "../src";
import * as path from "path";

import { describe, it, expect } from "@jest/globals";

describe("Autolayout", () => {
  const example_uri = path.join(__dirname, "../example-flows/force-app/main/default/flows/Unconnected_Element.flow-meta.xml");
  const fixed_uri = path.join(__dirname, "../example-flows/force-app/main/default/flows/Outdated_API_Version_Fixed.flow-meta.xml");

  it("should have a result when CanvasMode is set to FREE_FORM_CANVAS", async () => {
    const flows = await core.parse([example_uri]);
    const ruleConfig = {
      rules: {
        AutoLayout: {
          severity: "error",
        },
      },
    };

    const results: core.ScanResult[] = core.scan(flows, ruleConfig);
    const occurringResults = results[0].ruleResults.filter((rule) => rule.occurs);
    expect(occurringResults).toHaveLength(1);
    expect(occurringResults.find((res) => res.ruleName === "AutoLayout")).toBeTruthy();
  });

  it("should not have result when autolayout is configured", async () => {
    const flows = await core.parse([fixed_uri]);
    const ruleConfig = {
      rules: {
        AutoLayout: {
          severity: "error",
        },
      },
    };
    const results: core.ScanResult[] = core.scan(flows, ruleConfig);
    const occurringResults = results[0].ruleResults.filter((rule) => rule.occurs);
    expect(occurringResults).toHaveLength(0);
  });
});
