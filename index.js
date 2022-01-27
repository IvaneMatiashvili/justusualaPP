#!/usr/bin/env node

const { join } = require("path");
const chalk = require("chalk");
const boxen = require("boxen");
const gTTS = require("gtts");

const fs = require("fs");
const readline = require("readline");
const translatte = require("translatte");
const util = require("util");
const { co } = require("translatte/languages");
const { exit } = require("process");

let data = "";

process.stdin.on("data", (c) => {
  data += c;
  let el = data
    .trim()
    .split(/\n/)
    .map((el) => el.trim());

  if (el[0] === "translateandsave") {
    if (el.length > 1) {
      if (el[el.length - 1] === "exitt") process.exit();
      let traslattedEl = el[el.length - 1];
      translatte(traslattedEl, { to: "Ka" })
        .then((res) => {
          traslattedEl = res.text;
          el[el.length - 1] = `${el[el.length - 1]}: ${traslattedEl} \n`;

          fs.appendFile(
            "TranslatedImportantWords.txt",
            el[el.length - 1],
            function (err) {
              if (err) {
                throw err;
              } else {
                const greeting = chalk.white.bold(el[el.length - 1]);

                const boxenOptions = {
                  padding: 1,
                  margin: 1,
                  borderStyle: "round",
                  borderColor: "white",
                };
                const msgBox = boxen(greeting, boxenOptions);

                console.log(msgBox);
              }
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else if (el[0] === "createsaveandtranslate") {
    if (el[el.length - 1] === "exitt") process.exit();
    if (el[el.length - 1] === ".,.") {
      let [definiton, fileName, ...input] = el;
      input = input.join("\n");
      definiton = definiton.trim();
      fileName = fileName.trim();
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

        const fullTranslatedFileName = `fullTranslated${fileName}`;

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

                const boxenOptions = {
                  padding: 1,
                  margin: 1,
                  borderStyle: "round",
                  borderColor: "white",
                };
                const msgBox = boxen(greeting, boxenOptions);

                console.log(msgBox);
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });

        let wordsArr = fileContent.split(/ |\n/).map((el) => el.trim());
        const TranslattedFileName = `Translated${fileName}`;
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
  } else if (el[0] === "randomizer") {
    if (el.length === 2) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      let question = util.promisify(rl.question).bind(rl);

      const buffer = fs.readFileSync(el[1]);
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

      async function ask() {
        for (let i = 0; ; i++) {
          let randomData = data[Math.floor(Math.random() * data.length)];

          try {
            let answer = await question(` ${randomData[1]}: `);
            if (answer === "exitt") process.exit();

            const chalk = require("chalk");
            const boxen = require("boxen");

            const correctGreeting = chalk.white.bold(
              ` correct ${randomData[1]} არის ${randomData[0]}`
            );
            const wrongGreeting = chalk.white.bold(
              ` wrong ${randomData[1]} არის ${randomData[0]}`
            );

            const boxenOptions = {
              padding: 1,
              margin: 1,
              borderStyle: "round",
              borderColor: "white",
            };
            const correctMsgBox = boxen(correctGreeting, boxenOptions);
            const wrongMsgBox = boxen(wrongGreeting, boxenOptions);

            if (answer === randomData[0]) {
              console.log(correctMsgBox);
            } else {
              console.log(wrongMsgBox);
            }
          } catch (err) {
            console.error("Question rejected", err);
          }
        }
        rl.close();
      }

      ask();
    }
  } else if (el[0] === "texttovoice") {
    if (el[el.length - 1] === "exitt") process.exit();
    if (el.length > 2) {
      const buffer = fs.readFileSync(el[1]);
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

      gtts.save(`${el[2]}.mp3`, function (err, result) {
        if (err) {
          throw new Error(err);
        }

        const greeting = chalk.white.bold("Text to speech converted!");

        const boxenOptions = {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "white",
        };
        const msgBox = boxen(greeting, boxenOptions);

        console.log(msgBox);
      });
    }
  } else console.log("invalid input!"), process.exit();
});
process.stdin.on("end", () => {});
