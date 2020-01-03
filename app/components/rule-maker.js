import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import recast from 'recast';
import recastBabel from 'recastBabel';
import { preprocess } from '@glimmer/syntax';
import buildVisitor from 'linter-playground/utils/build-visitor';
import glimmerVisitor from 'linter-playground/utils/glimmer-visitor';
import eslintTemplate from 'linter-playground/utils/eslint-template';
import glimmerTemplate from 'linter-playground/utils/glimmer-template';

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
    let _rule = '';
    if(_lang === 'Javascript') {
     node = _ast.program.body[0];
      _visitor = buildVisitor(node);
     _rule = eslintTemplate(this.get('ruleType'), this.get('recommended'), _visitor);
    } else {
     node = _ast.body[0];
      _visitor = glimmerVisitor(node);
     _rule = glimmerTemplate(this.get('ruleType'), this.get('recommended'), _visitor);
    }



    return recast.prettyPrint(recastBabel.parse(_rule), { tabWidth: 2 }).code;
  }),
  init() {
    this._super(...arguments);
    this.set("jsonMode", { name: "javascript", json: true });
    this.set("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  }

});
