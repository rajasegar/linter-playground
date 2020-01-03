export default function glimmerTemplate(ruleType, recommended, visitor) {
  let _rule = `'use strict';

const Rule = require('./base');

const ERROR_MESSAGE = 'Your detailed error message goes here';

module.exports = class MyCustomRule extends Rule {
  logNode({ node, message }) {
    return this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }

  visitor() {
    return {
      ${visitor}
    };
  }
};

module.exports.ERROR_MESSAGE = ERROR_MESSAGE;`;

  return _rule;
}
