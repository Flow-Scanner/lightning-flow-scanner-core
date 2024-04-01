import {IRuleDefinition} from './main/interfaces/IRuleDefinition';
import { IRulesConfig } from './main/interfaces/IRulesConfig';
import { FixFlows } from './main/libs/FixFlows';
import { GetRuleDefinitions } from './main/libs/GetRuleDefinitions';
import { ScanFlows } from './main/libs/ScanFlows';
import {Flow} from './main/models/Flow';
import {ResultDetails} from './main/models/ResultDetails';
import {RuleResult} from './main/models/RuleResult';
import {ScanResult} from './main/models/ScanResult';

export function getRules(ruleNames?: string[]): IRuleDefinition[] {
  if (ruleNames && ruleNames.length > 0) {
    const ruleSeverityMap = new Map<string, string>(ruleNames.map((name) => [name, 'error']));
    return GetRuleDefinitions(ruleSeverityMap);
  } else {
    return GetRuleDefinitions();
  }
}

export function scan(flows: Flow[], ruleOptions?: IRulesConfig): ScanResult[] {

  const ruleMap = new Map<string, {}>();
  let scanResults: ScanResult[];
  if (ruleOptions?.rules && Object.entries(ruleOptions.rules).length > 0) {
    for (const [ruleName, rule] of Object.entries(ruleOptions.rules)) {
      ruleMap.set(ruleName, rule);
    }
    scanResults = ScanFlows(flows, ruleMap);
  } else {
    scanResults = ScanFlows(flows);
  }

  if (ruleOptions?.exceptions) {
    for (const [exceptionName, exceptionElements] of Object.entries(ruleOptions.exceptions)) {
      for (const scanResult of scanResults) {
        if (scanResult.flow.name === exceptionName) {
          for (const ruleResult of scanResult.ruleResults as RuleResult[]) {
            if (exceptionElements[ruleResult.ruleName]) {
              const exceptions = exceptionElements[ruleResult.ruleName];
              const filteredDetails = (ruleResult.details as ResultDetails[]).filter((detail) => {
                return !exceptions.includes(detail.name);
              });
              ruleResult.details = filteredDetails;
              ruleResult.occurs = filteredDetails.length > 0;
            }
          }
        }
      }
    }
  }

  return scanResults;
}

export function fix(results : ScanResult[]): ScanResult[] {
  
  let newResults = [];
  for (let result of results){
    let flow = result.flow;
    let ruleResults = result.ruleResults;
    let ruleNames = ruleResults.filter((r) => r.occurs).map((r) => r.ruleName);
    if(ruleNames.includes('UnusedVariable') || ruleNames.includes('UnconnectedElement')){
      result.flow = FixFlows(flow, ruleResults);
      newResults.push(result);
    }
  }

  return newResults
}


export { Flow } from './main/models/Flow';
export { FlowAttribute } from './main/models/FlowAttribute';
export { FlowElement } from './main/models/FlowElement';
export { FlowNode } from './main/models/FlowNode';
export { FlowType } from './main/models/FlowType';
export { FlowVariable } from './main/models/FlowVariable';
export { Compiler } from './main/libs/Compiler';
export { ScanResult } from './main/models/ScanResult';
export { RuleResult } from './main/models/RuleResult';
export { ResultDetails } from './main/models/ResultDetails';
export { IRuleDefinition } from './main/interfaces/IRuleDefinition';
