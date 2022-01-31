#!/usr/bin/env node

const translateANDSave = require("./translateAndSave");
const createSaveANDTranslate = require("./createSaveAndTranslate");
const randomzer = require("./randomizer");
const text_to_voice = require("./textToVoice");

let data = "";

process.stdin.on("data", (c) => {
  data += c;
  let el = data
    .trim()
    .split(/\n/)
    .map((el) => el.trim());

  if (el[0] === "translateandsave") {
    translateANDSave(el);
  } else if (el[0] === "createsaveandtranslate") {
    createSaveANDTranslate(el);
  } else if (el[0] === "randomizer") {
    randomzer(el);
  } else if (el[0] === "texttovoice") {
    text_to_voice(el);
  } else console.log("invalid input!"), process.exit();
});
process.stdin.on("end", () => {});
