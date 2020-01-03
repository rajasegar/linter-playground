import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import recast from 'recast';
import recastBabel from 'recastBabel';
import { preprocess } from '@glimmer/syntax';
import buildVisitor from 'linter-playground/utils/build-visitor';
import glimmerVisitor from 'linter-playground/utils/glimmer-visitor';

function filterAstNodes(key, value) {
  return ["loc","tokens"].includes(key) ? undefined : value;
}

export default Component.extend({
  customize: service(),
  theme: computed.reads("customize.theme"),
  code: computed('language', function() {
    let _lang = this.get('language');
    if(_lang === 'Javascript') {
    return `foo.bar()`;
    } else {
    return `{{hello}}`;
    }
  }),
  _ast: computed('code', 'language', function() {
    let _lang = this.get('language');
    let _ast;
    if(_lang === 'Javascript') {
      _ast = recastBabel.parse(this.get('code'));
    } else {
      _ast = preprocess(this.get('code'));
    }
    return _ast;
  }),
  ast: computed('_ast', function() {
    let _ast = this.get('_ast');
    return JSON.stringify(_ast, filterAstNodes, 2);
  }),
  rule: computed('code', 'ruleType', 'recommended', 'language', function() {
    let _lang = this.get('language')
    let node;
    let _visitor = '';
    let _ast = this.get('_ast');
    if(_lang === 'Javascript') {
     node = _ast.program.body[0];
      _visitor = buildVisitor(node);
    } else {
     node = _ast.body[0];
      _visitor = glimmerVisitor(node);
    }

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
        type: "${this.get('ruleType')}",

        docs: {
            description: "The decription of your rule goes here...",
            category: "Possible Errors",
            recommended: ${this.get('recommended')},
            url: "https://eslint.org/docs/rules/no-bad-stuff"
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
          ${_visitor}
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
