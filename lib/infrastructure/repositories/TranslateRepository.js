"use strict";
const TranslateRepositoryAbstract = require("./interfaces/TranslateRepositoryAbstract");
const deepl = require("deepl-node");

const adaptLang = (lang) => {
  const langMap = {
    "fr-FR": "fr",
  };
  return langMap[lang] || lang;
};
module.exports = class extends TranslateRepositoryAbstract {
  constructor() {
    super();
    this.translator = new deepl.Translator(process.env.DEEPL_API_KEY);
  }
  async translate(text, lang) {
    lang = adaptLang(lang);
    try {
      const result = await this.translator.translateText(text, null, lang);
      return lang === result.detectedSourceLang ? null : result.text;
    } catch (error) {
      return null;
    }
  }
};
