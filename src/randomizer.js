const fs = require("fs");
const readline = require("readline");
const util = require("util");
const config = require("./config.js");

function randomizer(el) {
  if (el.length === 2) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let question = util.promisify(rl.question).bind(rl);

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

          const correctMsgBox = boxen(correctGreeting, config.boxenOptions);
          const wrongMsgBox = boxen(wrongGreeting, config.boxenOptions);

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
}

module.exports = randomizer;
