import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import recast from 'recast';
import recastBabel from 'recastBabel';
import buildVisitor from 'linter-playground/utils/build-visitor';

function filterAstNodes(key, value) {
  return ["loc","tokens"].includes(key) ? undefined : value;
}

export default Component.extend({
  customize: service(),
  theme: computed.reads("customize.theme"),
  code: `foo.bar()`,
  ast: computed('code', function() {
    let _ast = recastBabel.parse(this.get('code'));
    return JSON.stringify(_ast, filterAstNodes, 2);
  }),
  rule: computed('code', 'ruleType', function() {
    let _ast = recastBabel.parse(this.get('code'));
    let node = _ast.program.body[0];

    let _rule = `/**
 * @fileoverview Rule to disallow unnecessary stuff
 * @author Ember Tomster
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "${this.get('ruleType')}",

        docs: {
            description: "The decription of your rule goes here...",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-bad-stuff"
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
          ${buildVisitor(node)}
        };
    }
};`;
    return recast.prettyPrint(recastBabel.parse(_rule), { tabWidth: 2 }).code;
  }),
  init() {
    this._super(...arguments);
    this.set("jsonMode", { name: "javascript", json: true });
    this.set("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  }

});
