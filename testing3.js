const { join } = require("path");

const fs = require("fs");
const translatte = require("translatte");

let data = "";

process.stdin.on("data", (c) => (data += c));
process.stdin.on("end", () => {
  let [definiton, fileName, ...input] = data.trim().split(/\n/);
  input = input.join("\n");
  definiton = definiton.trim();
  fileName = fileName.trim();

  fs.writeFileSync(fileName, input, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("file saved!");
  });

  console.log(fileName);

  const timerObj = setTimeout(() => {
    console.log("...");
  }, 2000);

  timerObj.unref();

  setImmediate(() => {
    timerObj.ref();
  });

  const buffer = fs.readFileSync(fileName);
  const fileContent = buffer.toString();
  console.log(fileContent);
});
