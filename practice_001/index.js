const fs = require("fs");

const testRead = fs.readFileSync("./testInput.txt", "utf-8");

console.log(testRead);

fs.writeFileSync(
  "./testOutput.txt",
  `this test is for writing on files.\n the input file includes: (${testRead})`
);
