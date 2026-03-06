async function test() {
  const res = await fetch('http://localhost:3000/award/1/2/3/4/5/6');
  const html = await res.text();
  console.log(html.match(/<meta property="og:image".*?>/)?.[0]);
}
test();
