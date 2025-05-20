import { FlowType, IRuleDefinition } from "../internals/internals";
import { LoopRuleCommon } from "../models/LoopRuleCommon";

export class ActionCallsInLoop extends LoopRuleCommon implements IRuleDefinition {
  constructor() {
    super(
      {
        autoFixable: false,
        description:
          "To prevent exceeding Apex governor limits, it is advisable to consolidate and bulkify your apex calls, utilize a single action call containing a collection variable at the end of the loop.",
        docRefs: [
          {
            label: "Invocable Method Considerations",
            path: "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_InvocableMethod.htm",
          },
        ],
        isConfigurable: false,
        label: "**Beta** Action Calls In Loop",
        name: "ActionCallsInLoop",
        supportedTypes: FlowType.backEndTypes,
      },
      { severity: "warning" }
    );
  }

  protected getStatementTypes(): string[] {
    return ["actionCalls", "apexPluginCalls"];
  }
}
