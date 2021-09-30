const sirv = require('sirv');
const polka = require('polka');
const fs = require('fs');
const dummy = require('./dummy.json');
const { parseHTML } = require('linkedom');

global.__baseClient = __dirname + "/client";

const loadFile = (file) => fs.readFileSync(__baseClient + file, 'utf8');
const index = loadFile("/template.html");
const { window, document } = parseHTML(index);
Object.assign(global, { window, document });

const vanuClient = require('./client/router');

polka()
  .use(sirv(__baseClient))
  //custom page with init data from server
  .get("/", (req, res) => {
    vanuClient.listen(req, res, dummy);
  })
  //api home for load dummy
  .get("/api/home", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(dummy));
  })
  //all page
  .get("*", (req, res) => {
    vanuClient.listen(req, res);
  })
  .listen(3000, _ => console.log('Running on 3000'));
