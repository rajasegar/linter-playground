import Controller from '@ember/controller';

const LANGUAGES = [
  'Javascript',
  'Handlebars'
];

const RULE_TYPES = [
  'problem',
  'suggestion',
  'layout'
];

const jsCode = `foo.bar()`;
export default Controller.extend({
  code: jsCode,
  language: 'Javascript',
  ruleType: 'problem',
  recommended: false,
  actions: {
    toggleRecommended() {
      this.toggleProperty('recommended');
    }
  },
  init() {
    this._super(...arguments);
    this.set('languages', LANGUAGES)
    this.set('ruleTypes', RULE_TYPES)
  }
});
