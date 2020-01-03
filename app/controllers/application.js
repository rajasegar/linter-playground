import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

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
  customize: service(),
  code: jsCode,
  language: 'Javascript',
  ruleType: 'problem',
  recommended: false,
  actions: {
    toggleDarkMode() {
      this.customize.toggleDarkMode();
    },
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
