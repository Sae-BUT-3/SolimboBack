"use strict";
const TranslateRepositoryAbstract = require("./interfaces/TranslateRepositoryAbstract");
const deepl = require("deepl-node");
module.exports = class extends TranslateRepositoryAbstract {
  constructor() {
    super();
    this.translator = new deepl.Translator(process.env.DEEPL_API_KEY);
  }
  async translate(text, lang) {
    const result = await this.translator.translateText(text, null, lang);
    return result.text;
  }
};
