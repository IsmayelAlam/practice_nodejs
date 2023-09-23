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
  const pathName = req.url;

  switch (pathName) {
    case "/":
      res.writeHead(200, {
        "Content-type": "text/html",
        "test-Herder": "custom header",
      });
      res.end("<h1>Hello world!</h1>");
      return;
    case "/overview":
      return res.end("<h1>overview</h1>");
    case "/test":
      return res.end("<h1>test</h1>");
    case "/anotherTest":
      return res.end("<h1>another test</h1>");
    default:
      return res.end("<h1>404|Page not found</h1>");
  }
});

server.listen(3000, "localhost", () => console.log("server started"));
