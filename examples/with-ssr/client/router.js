let IS_SERVER = typeof require !== 'undefined';

const app = (IS_SERVER ? require("vanu") : vanu)({
  baseController: "/page/",
  target: "#ssr-app"
});
//make router
app.get("/", { controller: "home.js" });
app.get("/about", { controller: "about.js" });

if (!IS_SERVER) app.listen();

module.exports = app;