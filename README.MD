## Vanu

[![npm version](https://img.shields.io/badge/npm-0.0.5-blue.svg)](https://npmjs.org/package/vanu) 
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![download-url](https://img.shields.io/npm/dm/vanu.svg)](https://npmjs.org/package/vanu)

Router based vanilla app.

[See examples](https://github.com/herudi/vanu/tree/master/examples)

Demo SSR => https://vanilla-ssr-gilt.vercel.app

## Features
- Just ~2kb gzipped, ~5kb minified.
- Middleware support.
- LazyLoad js support.
- SSR support.
- Listener `before` and `after` load.

## Install
### npm or yarn
```bash
npm i vanu
// or
yarn add vanu
```

### Browser
```html
<!-- non module -->
<script src="//unpkg.com/vanu"></script>

<!-- es module -->
<script type="module">
  import vanu from "https://unpkg.com/vanu/dist/index.esm.js";
  const app = vanu();
  //other code
</script>
```

## Usage

```html
<html>
<head>
  <script src="//unpkg.com/vanu"></script>
</head>
<body>
  <nav>
    <a href="/" u-link>Home</a>
    <a href="/about" u-link>About</a>
    <a href="/hello/john" u-link>User John</a>
  </nav>
  <div id="app"></div>

  <!-- your js -->
  <script>
    const app = vanu({ target: "#app" });

    app.get("/", ({ html, render, useValue }) => {
      const count = useValue(0);
      const myClick = () => count.value++;
      render(() => html`
        <button onclick="${myClick}">click !</button>
        <h2>Counter: ${count.value}</h2>
      `)
    });

    app.get("/about", ({ html, render }) => {
      render(() => html`<h1>About</h1>`)
    });

    // params
    app.get("/hello/:name", ({ html, params, render }) => {
      render(() => html`<h1>Hello ${params.name}</h1>`);
    });

    // handle not found
    app.get("*", ({ html }) => {
      render(() => html`<h1>404 not found</h1>`);
    });

    // listen the app
    app.listen();
  </script>
</body>
</html>
```

## With Hash
```html
...
<nav>
  <a href="#/" u-link>Home</a>
  <a href="#/about" u-link>About</a>
</nav>
<div id="app"></div>
...
```

> Extension vscode for literal html [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)

## Lazy load
```js
const app = vanu({ target: "#app" });
app.get("/", {
  // load controller js
  controller: "/path/to/home.js",

  // (optional) function name controller default to home or filename js.
  name: "home"
});
app.listen();
```
### home.js
```js
function home({ html, render }) {
  //your code here

  render(() => html`<h1>Welcome Home</h1>`);
}
```

## Middleware
```js

function foo(ctx, next) {
  ctx.foo = "foo";
  next();
};
function bar(ctx, next) {
  ctx.bar = "bar";
  next();
};

const app = vanu({ target: "#app" });
app.use(foo);
app.get("/", bar, ({ render, html }) => {
  render(() => html`<h1>${ctx.foo + ctx.bar}</h1>`);
});
app.get("/user", bar, {
  controller: "/path/to/user.js",
});
app.listen();
```
## Listener like start, end and error
```js
...
//on page start
app.on("vanu:start", (event) => {
  console.log("Start");
});

//on page end
app.on("vanu:end", (event) => {
  console.log("End");
});

//on handle error
app.on("vanu:error", (error, { render, html }) => {
  console.log(error.message);
  render(() => html`<h1>${error.message || "Something went wrong"}</h1>`);
});
...
```
## SSR
```js
...
polka()
  .use(sirv(__baseClient))
  .get("*", (req, res, next) => {
    clientApp.listen(req, res, initData);
  })
  .listen(3000);
...
```
[See example with ssr](https://github.com/herudi/vanu/tree/master/examples/with-ssr)
## Config
```js
const app = vanu({
  //parseQuery
  parse?: (str: string) => Record<string, any>,

  //base url
  base?: string,

  //baseController
  baseController?: string,

  //target id. default undefined
  target?: string | document,

  //timeout for load page van:start and van:end default 300.
  timeout?: number
});
```

## License

[MIT](LICENSE)
