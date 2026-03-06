async function test() {
  const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400&display=swap`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36' }
  });
  const css = await cssRes.text();
  console.log("With Chrome UA:", css.match(/url\((https:\/\/[^)]+)\)/)?.[1]);

  const cssRes2 = await fetch(`https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400&display=swap`);
  const css2 = await cssRes2.text();
  console.log("Without UA:", css2.match(/url\((https:\/\/[^)]+)\)/)?.[1]);
}
test();
