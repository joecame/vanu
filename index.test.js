Object.assign(global, { window: { document: { querySelector: (a) => { } } } });
const vanu = require('./dist/index');
const test = require('ava');

//this is internal test for vanu

const app = vanu({ target: "#app" });

test('app is object', t => {
  t.is(typeof app, 'object');
});
test('app get is function', t => {
  t.is(typeof app.get, 'function');
});
test('app listen is function', t => {
  t.is(typeof app.listen, 'function');
});
app
  .get('/home', () => { })
  .get('/about', () => { })
  .get('/user/:name', () => { })
  .get('/image/:file.(png|jpg)', () => { })
  .get('/items/:id?', () => { });

test('app routes length to be 5', t => {
  t.is(app.routes.length, 5);
});

function getRoute(t, path) {
  const { fns } = app.find(path);
  t.is(fns.length, 1);
}
function getNotFoundRoute(t, path) {
  const { fns } = app.find(path);
  t.is(fns, void 0);
}

test('route /home', (t) => getRoute(t, "/home"));
test('route /about', (t) => getRoute(t, "/about"));
test('route /user/:name', (t) => getRoute(t, "/user/john"));
test('route /image/:file.(png|jpg)', (t) => getRoute(t, "/image/icon.png"));
test('route /items/:id?', (t) => getRoute(t, "/items"));
test('route /items/:id? with param', (t) => getRoute(t, "/items/123"));
test('route not found test', (t) => getNotFoundRoute(t, "/noop"));