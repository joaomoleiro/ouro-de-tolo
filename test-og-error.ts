async function test() {
  const res = await fetch('http://localhost:3000/api/og/one-show-that-n/grande-premio-c/projeto-integra/roi-baixo-mas-m/vasco-gama-disc/edson-legend-at_paulo-maverick_ze-maria-old-sc/image.png');
  const text = await res.text();
  console.log(res.status, text);
}
test();
