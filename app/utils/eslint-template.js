export default function eslintTemplate(ruleType, recommended, visitor) {
    let _rule = `/**
 * @fileoverview Rule to disallow unnecessary stuff
 * @author Linter Playground
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "${ruleType}",

        docs: {
            description: "The decription of your rule goes here...",
            category: "Possible Errors",
            recommended: ${recommended},
            url: "https://eslint.org/docs/rules/no-bad-stuff"
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
          ${visitor}
        };
    }
};`;

  return _rule;
}
