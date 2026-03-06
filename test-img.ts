async function test() {
  const res = await fetch('http://localhost:3000/api/og/1/2/3/4/5/6/image.png');
  console.log(await res.text());
}
test();
