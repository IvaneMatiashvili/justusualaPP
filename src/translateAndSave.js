const chalk = require("chalk");
const boxen = require("boxen");

const fs = require("fs");
const translatte = require("translatte");
const config = require("./config.js");

function translateAndSave(ell) {
  if (ell.length > 1) {
    if (ell[ell.length - 1] === "exitt") process.exit();
    let traslattedEl = ell[ell.length - 1];
    translatte(traslattedEl, { to: "Ka" })
      .then((res) => {
        traslattedEl = res.text;
        ell[ell.length - 1] = `${ell[ell.length - 1]}: ${traslattedEl} \n`;

        fs.appendFile(
          "../build/TranslatedImportantWords.txt",
          ell[ell.length - 1],
          function (err) {
            if (err) {
              throw err;
            } else {
              const greeting = chalk.white.bold(ell[ell.length - 1]);

              const msgBox = boxen(greeting, config.boxenOptions);

              console.log(msgBox);
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = translateAndSave;
