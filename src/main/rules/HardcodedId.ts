import { AdvancedRule } from "../models/AdvancedRule";
import * as core from "../internals/internals";

export class HardcodedId extends AdvancedRule implements core.IRuleDefinition {
  constructor() {
    super({
      name: "HardcodedId",
      label: "Hardcoded Id",
      description:
        "Avoid hard-coding IDs as they are org-specific. Instead, pass them into variables at the start of the flow. You can achieve this by utilizing merge fields in URL parameters or employing a Get Records element.",
      supportedTypes: core.FlowType.allTypes(),
      docRefs: [
        {
          label: "Flow Best Practices",
          path: "https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5",
        },
        {
          label: "Don't hard code Record Type IDs in Flow. By Stephen Church.",
          path: "https://www.linkedin.com/feed/update/urn:li:activity:6947530300012826624/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A6947530300012826624%29",
        },
      ],
      isConfigurable: false,
      autoFixable: false,
    });
  }

  public execute(flow: core.Flow): core.RuleResult {
    const nodesWithHardcodedIds = [];
    const salesforceIdRegex = /\b[a-zA-Z0-9]{5}0[a-zA-Z0-9]{9}([a-zA-Z0-9]{3})?\b/g;

    for (const node of flow.elements) {
      const nodeString = JSON.stringify(node);
      if (salesforceIdRegex.test(nodeString)) {
        nodesWithHardcodedIds.push(node);
      }
    }

    const results = nodesWithHardcodedIds.map((node) => new core.ResultDetails(node));
    return new core.RuleResult(this, results);
  }
}
