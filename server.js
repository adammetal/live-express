import express from "express";
import morgan from "morgan";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "static");
const __admin = join(__dirname, 'admin');
const __cards = join(__dirname, "db", "cards.json");
const __port = process.env?.PORT ?? 8080;

const app = express();

app.use(morgan("dev"));

app.use('/admin', express.static(__admin));
app.use(express.static(__public));

app.get("/cards", async (req, res) => {
  const cards = JSON.parse(await readFile(__cards, "utf-8"));
  const html = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cards</title>
    </head>
    <body>
      ${cards.map(
        (card) => `
        <div>
          <h1>${card.name}</h1>
          <img src="${card.image_uris.png}" width="300" />
        </div>
      `
      )}
    </body>
    </html>
  `;
  res.send(html.trim());
});

app.get('/api/cards', async (req, res) => {
  const cards = JSON.parse(await readFile(__cards, "utf-8"));
  return res.json(cards);
})

app.listen(__port, () => {
  console.log(`App listening on ${__port}`);
});
