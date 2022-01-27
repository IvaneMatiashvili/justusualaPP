const readline = require("readline");
const fs = require("fs");
const util = require("util");
const { exit } = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let question = util.promisify(rl.question).bind(rl);

const buffer = fs.readFileSync("Translatedsave.txt");
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
      if (answer === "exit") process.exit();

      if (answer === randomData[0])
        console.log(` correct ${randomData[1]} არის ${randomData[0]}`);
      else console.log(` wrong ${randomData[1]} არის ${randomData[0]}`);
    } catch (err) {
      console.error("Question rejected", err);
    }
  }
  rl.close();
}

ask();

process.stdin.on("end", () => {
  /*let input = data
    .trim()
    .split(/\n/)
    .map((el) =>
      el
        .trim()
        .split(/ |:/)
        .filter((el) => el !== "")
    );

  let inputt = input[Math.floor(Math.random() * input.length)];

  console.log(inputt);*/
});
