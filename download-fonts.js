const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  await download('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXDTzYgWE_-xU.ttf', path.join(fontsDir, 'PlayfairDisplay-BlackItalic.ttf'));
  await download('https://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuyJG.ttf', path.join(fontsDir, 'Lora-Regular.ttf'));
  await download('https://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLre-cjT8sLweu0zK.ttf', path.join(fontsDir, 'Lora-Italic.ttf'));
  console.log('Fonts downloaded');
}

run();
