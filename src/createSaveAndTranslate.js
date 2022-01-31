const fs = require("fs");
const translatte = require("translatte");
const config = require("./config.js");

function createSaveAndTranslate(el) {
  if (el[el.length - 1] === "exitt") process.exit();
  if (el[el.length - 1] === ".,.") {
    let [definiton, fileName, ...input] = el;
    input = input.join("\n");
    definiton = definiton.trim();
    fileName = fileName.trim();
    fileName = `../build/${fileName}`;
    if (definiton === "createsaveandtranslate") {
      fs.writeFileSync(fileName, input, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        // console.log("file saved!");
      });

      const buffer = fs.readFileSync(fileName);
      const fileContent = buffer.toString();

      let fullText = fileContent.trim();

      // const fullTranslatedFileName = `fullTranslated${fileName}`;
      let fullTranslatedFileName = fileName.split("/");
      fullTranslatedFileName[
        fullTranslatedFileName.length - 1
      ] = `fullTranslated${
        fullTranslatedFileName[fullTranslatedFileName.length - 1]
      }`;
      fullTranslatedFileName = fullTranslatedFileName.join("/");
      fs.writeFile(fullTranslatedFileName, "", (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved

        // console.log("file saved!");
      });

      translatte(fullText, { to: "Ka" })
        .then((res) => {
          let fullTextTranslated = res.text;
          fullText = `${fullText} \n \n${fullTextTranslated} \n`;

          fs.appendFile(fullTranslatedFileName, fullText, function (err) {
            if (err) {
              throw err;
            } else {
              const chalk = require("chalk");
              const boxen = require("boxen");

              const greeting = chalk.white.bold(fullText);

              const msgBox = boxen(greeting, config.boxenOptions);

              console.log(msgBox);
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });

      let wordsArr = fileContent.split(/ |\n/).map((el) => el.trim());
      // const TranslattedFileName = `Translated${fileName}`;

      let TranslattedFileName = fileName.split("/");
      TranslattedFileName[TranslattedFileName.length - 1] = `Translatted${
        TranslattedFileName[TranslattedFileName.length - 1]
      }`;
      TranslattedFileName = TranslattedFileName.join("/");
      fs.writeFile(TranslattedFileName, "", (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved

        // console.log("file saved!");
      });

      wordsArr.forEach((el) => {
        if (el !== ".,.") {
          let traslattedEl = el;

          translatte(traslattedEl, { to: "Ka" })
            .then((res) => {
              traslattedEl = res.text;
              el = `${el}: ${traslattedEl} \n`;

              fs.appendFile(TranslattedFileName, el, function (err) {
                if (err) {
                  throw err;
                } else {
                }
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
    }
  }
}

module.exports = createSaveAndTranslate;
