function about({ html, render }) {
  document.title = "Welcome About";
  render(() => html`<h1>About</h1>`)
}

module.exports = about;