async function test() {
  const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap`);
  const css = await cssRes.text();
  console.log(css);
}
test();
