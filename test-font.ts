async function test() {
  const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&display=swap`);
  console.log(await cssRes.text());
}
test();
