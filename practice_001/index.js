const fs = require("fs");
const http = require("http");

/*
const testRead = fs.readFileSync("./testInput.txt", "utf-8");
fs.writeFileSync(
  "./testOutput.txt",
  `this test is for writing on files.\n the input file includes: (${testRead})`
);
fs.readFile("./testInput.txt", "utf-8", (err, data) =>
  fs.writeFile(
    "./testOutput.txt",
    `asynchronous reading data.\nthe input file includes: (${data})`,
    "utf-8",
    (err) => console.log("written")
  )
);
*/

const server = http.createServer((req, res) => {
  res.end("Hello world!");
});

server.listen(3000, "localhost", () => console.log("server started"));
