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
const data = fs.readFileSync(`${__dirname}/test/data.json`, "utf-8");
const overviewTemplate = fs.readFileSync(
  `${__dirname}/test/overviewTemplate.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/test/productTemplate.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/test/cardTemplate.html`,
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end(overviewTemplate);
      return;

    case "/product":
      return res.end("<h1>test</h1>");

    case "/API":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
      return;

    default:
      return res.end("<h1>404|Page not found</h1>");
  }
});

server.listen(3000, "localhost", () => console.log("server started"));
