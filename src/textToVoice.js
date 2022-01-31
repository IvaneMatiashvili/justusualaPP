const chalk = require("chalk");
const boxen = require("boxen");
const gTTS = require("gtts");
const fs = require("fs");
const config = require("./config.js");

function textToVoice(el) {
  if (el[el.length - 1] === "exitt") process.exit();
  if (el.length > 2) {
    const buffer = fs.readFileSync(`../build/${el[1]}`);
    const fileContent = buffer.toString();

    let data = fileContent
      .trim()
      .split(/\n/)
      .map((el) =>
        el
          .trim()
          .split(/ |:/)
          .filter((el) => el !== "")
      );

    var speech =
      data.join() +
      "        " +
      "              " +
      "                 " +
      "    " +
      "შეგეცით ყველას";
    var gtts = new gTTS(speech, "en");

    gtts.save(`../build/${el[2]}.mp3`, function (err, result) {
      if (err) {
        throw new Error(err);
      }

      const greeting = chalk.white.bold("Text to speech converted!");
      const msgBox = boxen(greeting, config.boxenOptions);

      console.log(msgBox);
    });
  }
}

module.exports = textToVoice;
