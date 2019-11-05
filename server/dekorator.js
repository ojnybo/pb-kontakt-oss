const jsdom = require("jsdom");
const request = require("request");
const NodeCache = require("node-cache");
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE
});

const getUrl = namespace => {
  if (namespace !== "p") {
    // Q0, Q1, Q6 etc ..
    return `https://appres-${namespace}.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
  } else {
    // Produksjon
    return `https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
  }
};

const getDecorator = namespace =>
  new Promise((resolve, reject) => {
    const decorator = cache.get(namespace);
    if (decorator) {
      console.log(`${q0}: Using cache`);
      resolve(decorator);
    } else {
      request(getUrl(namespace), (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = "innerHTML";
          const data = {
            NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
            NAV_SCRIPTS: document.getElementById("scripts")[prop],
            NAV_STYLES: document.getElementById("styles")[prop],
            NAV_HEADING: document.getElementById("header-withmenu")[prop],
            NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
            MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
              prop
            ]
          };
          console.log(`${q0}: Creating cache`);
          cache.set(namespace, data);
          resolve(data);
        } else {
          reject(new Error(error));
        }
      });
    }
  });

module.exports = getDecorator;
