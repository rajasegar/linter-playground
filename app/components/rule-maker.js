import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  customize: service(),
  theme: computed.reads("customize.theme"),
  code: `foo.bar()`,
  ast: ``,
  init() {
    this._super(...arguments);
    this.set("jsonMode", { name: "javascript", json: true });
    this.set("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  }

});
