import { assert, expect } from 'chai';
import 'mocha';
import * as core from '../src';
import dmlstatementsinaloop from './testfiles/DMLStatementInALoop_Demo.json';
import dmlstatementsinaloopfixed from './testfiles/DMLStatementInALoop_Demo_Fixed.json';

describe('In the DMLStatementInALoop_Demo flow', () => {
  let flow: core.Flow;
  
  it('there should be one result for the rule DMLStatementInLoop', ()                                                                            => {
    flow = new core.Flow({
        path: './testfiles/DML_statements_in_a_loop.flow',
        xmldata: dmlstatementsinaloop,
      });
    const results: core.ScanResult[] = core.scan([flow]);
    const occurringResults = results[0].ruleResults.filter((rule) => rule.occurs);
    expect(occurringResults.length).to.equal(1);
    expect(occurringResults[0].ruleName).to.equal("DMLStatementInLoop");
  });

  it('there should be no result for the rule DMLStatementInLoop', ()                                                                            => {
    flow = new core.Flow({
      path: './testfiles/DML_statements_in_a_loop_fixed.flow',
      xmldata: dmlstatementsinaloopfixed,
    });
    const results: core.ScanResult[] = core.scan([flow]);
    const occurringResults = results[0].ruleResults.filter((rule) => rule.occurs);
    expect(occurringResults.length).to.equal(0);
  });
});