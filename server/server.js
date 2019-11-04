require("dotenv").config();

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const baseUrl = "/person/kontakt-oss";
const server = express();

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

// parse application/json
server.use(express.json());

// Static files
server.use(baseUrl, express.static(buildPath, { index: false }));

// Nais functions
server.get(`${baseUrl}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Match everything except internal og static
server.use(/\/(person\/kontakt-oss)\/*(?:(?!static|internal).)*$/, (req, res) =>
  getDecorator()
    .then(html => res.send(html))
    .catch(error => console.error("Failed to get decorator", error))
);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`App listening on port: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);
