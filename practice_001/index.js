const fs = require("fs");
const http = require("http");
const URL = require("url");

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
function replaceTemp(temp, product) {
  let output = temp
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGES%}/g, product.image)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%LOCATION%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%DESCRIPTION%}/g, product.description)
    .replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
}

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
  const { path, query } = URL.parse(req.url, true);

  switch (pathName) {
    case "/":
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      const items = dataObj.map((item) => replaceTemp(cardTemplate, item));

      res.end(overviewTemplate.replace("{%PRODUCTCARDS%}", items.join("")));
      return;

    case path:
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      const product = dataObj[query.id];
      const output = replaceTemp(productTemplate, product);

      res.end(output);
      return;

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
