async function home({ html, render, useValue, initData }) {
  document.title = "Welcome Home";
  const data = useValue([]);
  if (initData) {
    data.value = initData;
  } else {
    const res = await fetch("/api/home");
    data.value = await res.json();
  }
  render(() => html`
    <h1>Home</h1>
    ${data.value.map(el => html`<li>${el.name}</li>`).join("")}
  `)
}

module.exports = home;