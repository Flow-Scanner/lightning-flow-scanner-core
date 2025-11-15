import * as core from "../internals/internals";
import { RuleCommon } from "../models/RuleCommon";
import { IRuleDefinition } from "../interfaces/IRuleDefinition";

export class MissingMetadataDescription extends RuleCommon implements IRuleDefinition {
  constructor() {
    super({
      name: "MissingMetadataDescription",
      label: "Missing Metadata Description",
      description: "Every element must have a meaningful description",
      supportedTypes: core.FlowType.allTypes(),
      docRefs: [],
      isConfigurable: false,
      autoFixable: false,
    });
  }

  public execute(flow: core.Flow, options?: object, suppressions: string[] = []): core.RuleResult {
    return this.executeWithSuppression(flow, options, suppressions, (suppSet) => {
      const results: core.ResultDetails[] = flow.elements
        .filter((elem) => {
          console.log("elem: ", elem);
          if (elem.metaType !== "metadata" && !elem.element["description"]) {
            return elem;
          }
        })
        .map((elem) => {
          console.log("elem.map: ", elem);
          return new core.ResultDetails(elem);
        });

      return new core.RuleResult(this, results);
    });
  }
}
