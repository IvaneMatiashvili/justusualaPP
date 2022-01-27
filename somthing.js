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

  console.log(input);

  fs.writeFileSync(fileName, input, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("file saved!");
  });

  console.log(fileName);

  const buffer = fs.readFileSync(fileName);
  const fileContent = buffer.toString();
  console.log(fileContent);

  let fullText = fileContent.trim();

  const fullTranslatedFileName = `fullTranslated${fileName}`;

  fs.writeFile(fullTranslatedFileName, "", (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved

    console.log("file saved!");
  });

  translatte(fullText, { to: "Ka" })
    .then((res) => {
      let fullTextTranslated = res.text;
      fullText = `${fullText} \n \n${fullTextTranslated} \n`;

      fs.appendFile(fullTranslatedFileName, fullText, function (err) {
        if (err) {
          throw err;
        } else {
          console.log(fullText);
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

    console.log("file saved!");
  });

  wordsArr.forEach((el) => {
    if (el === "exit") {
      process.kill();
    }
    let traslattedEl = el;

    translatte(traslattedEl, { to: "Ka" })
      .then((res) => {
        traslattedEl = res.text;
        el = `${el}: ${traslattedEl} \n`;

        fs.appendFile(TranslattedFileName, el, function (err) {
          if (err) {
            throw err;
          } else {
            console.log("file created and saved!");
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
