import express from 'express';
import { createServer as createViteServer } from 'vite';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DATA } from './src/data.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Font cache
let fonts: any = {};
async function loadFonts() {
  try {
    const fetchFont = async (url: string) => {
      const res = await fetch(url);
      return await res.arrayBuffer();
    };
    
    // Helper to get font URL from Google Fonts CSS
    const getFontUrl = async (family: string, italic = false, weight = 400) => {
      const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:ital,wght@${italic?'1':'0'},${weight}&display=swap`);
      const css = await cssRes.text();
      const match = css.match(/url\((https:\/\/[^)]+)\)/);
      return match ? match[1] : null;
    };

    const playfairUrl = await getFontUrl('Playfair Display', true, 900);
    const loraUrl = await getFontUrl('Lora', false, 400);
    const loraItalicUrl = await getFontUrl('Lora', true, 400);

    if (playfairUrl) fonts.playfair = await fetchFont(playfairUrl);
    if (loraUrl) fonts.lora = await fetchFont(loraUrl);
    if (loraItalicUrl) fonts.loraItalic = await fetchFont(loraItalicUrl);
    
    console.log("Fonts loaded successfully for OG image generation");
  } catch (e) {
    console.error("Failed to load fonts", e);
  }
}
loadFonts();

// API Routes
app.get('/api/og/:f/:g/:c/:t/:u/:j/image.png', async (req, res) => {
  try {
    const { f, g, c, t, u, j } = req.params;
    const juries = j ? j.split('_') : [];

    const award = {
      festival: DATA.festivals.find(x => x.id === f)?.text || DATA.festivals[0].text,
      grade: DATA.grades.find(x => x.id === g)?.text || DATA.grades[0].text,
      category: DATA.categories.find(x => x.id === c)?.text || DATA.categories[0].text,
      testimonial: DATA.testimonials.find(x => x.id === t)?.text || DATA.testimonials[0].text,
      client: DATA.clients.find(x => x.id === u)?.text || DATA.clients[0].text,
      jury: juries.map(id => DATA.juries.find(x => x.id === id)?.text).filter(Boolean)
    };
    
    if (award.jury.length === 0) {
       award.jury = [DATA.juries[0].text, DATA.juries[1].text, DATA.juries[2].text];
    }

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '1200px',
            height: '630px',
            backgroundColor: '#0A0A0A',
            border: '8px solid #D4AF37',
            padding: '60px',
            color: 'white',
            fontFamily: 'Lora',
          },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', flexDirection: 'column' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { color: '#D4AF37', fontSize: '24px', textTransform: 'uppercase', letterSpacing: '0.5em', marginBottom: '10px' },
                      children: 'Galardão Atribuído'
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '72px', fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 900, color: 'white', textTransform: 'uppercase', marginBottom: '40px', lineHeight: 1.1 },
                      children: award.grade
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { color: '#888', fontSize: '24px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '15px' },
                      children: 'Categoria'
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '36px', color: '#ddd', lineHeight: 1.3 },
                      children: `"${award.category}"`
                    }
                  }
                ]
              }
            },
            {
              type: 'div',
              props: {
                style: { display: 'flex', flexDirection: 'column' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { color: '#888', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '10px' },
                      children: 'Festival Oficial'
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '32px', fontStyle: 'italic', color: '#D4AF37', marginBottom: '40px' },
                      children: award.festival
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', flexDirection: 'column', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '30px' },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: { fontSize: '28px', fontStyle: 'italic', color: '#ccc', lineHeight: 1.4 },
                            children: `"${award.testimonial}"`
                          }
                        },
                        {
                          type: 'div',
                          props: {
                            style: { fontSize: '20px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '15px' },
                            children: `— ${award.client}`
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      } as any,
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Playfair Display', data: fonts.playfair, weight: 900, style: 'italic' },
          { name: 'Lora', data: fonts.lora, weight: 400, style: 'normal' },
          { name: 'Lora', data: fonts.loraItalic, weight: 400, style: 'italic' },
        ].filter(f => f.data) as any,
      }
    );

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': pngBuffer.length,
      'Cache-Control': 'public, max-age=31536000'
    });
    res.end(pngBuffer);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error generating image');
  }
});

// Vite integration
async function startServer() {
  let vite: any;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist', { index: false }));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const host = req.get('host') || '';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    try {
      let template;
      if (process.env.NODE_ENV !== 'production') {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
      }

      let ogTags = `
        <meta property="og:title" content="Ouro de Tolo - Gerador de Masturbação Criativa" />
        <meta property="og:description" content="Gera o teu próprio prémio de publicidade e partilha com a tua rede." />
      `;

      const awardMatch = url.match(/^\/award\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/\?]+)/);
      if (awardMatch) {
        const [_, f, g, c, t, u, j] = awardMatch;
        const shareUrl = `${baseUrl}/award/${f}/${g}/${c}/${t}/${u}/${j}`;
        const imageUrl = `${baseUrl}/api/og/${f}/${g}/${c}/${t}/${u}/${j}/image.png`;
        ogTags = `
          <meta property="og:title" content="Ganhámos um prémio no Ouro de Tolo! 🏆" />
          <meta property="og:description" content="Mais um galardão para a estante. Clica para ver os detalhes desta conquista incrível." />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content="${shareUrl}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="${imageUrl}" />
        `;
      }

      const html = template.replace('</head>', `${ogTags}\n</head>`);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (vite) vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
