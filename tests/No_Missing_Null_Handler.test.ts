import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import * as core from "../src";

describe("MissingNullHandler", () => {
  const example_uri = path.join(
    __dirname,
    "../files/example-flows/force-app/main/default/flows/No_Missing_Null_Handler.flow-meta.xml"
  );

  it("should not return a result", async () => {
    const flows = await core.parse([example_uri]);
    expect(flows.length).toBeGreaterThan(0);

    const ruleConfig = {
      rules: {
        MissingNullHandler: {
          severity: "error"
        }
      }
    };

    const results: core.ScanResult[] = core.scan(flows, ruleConfig);
    expect(results.length).toBeGreaterThan(0);

    const ruleResult = results[0].ruleResults.find(r => r.ruleName === "MissingNullHandler");
    expect(ruleResult).toBeDefined();
    expect(ruleResult.occurs).toBe(false);
  });
});
