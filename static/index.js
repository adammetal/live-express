import { getCards } from "./utils/client.js";

const root = document.querySelector("#root");

const create = (tag, attributes) => {
  const el = document.createElement(tag);

  if (!attributes) {
    return el;
  }

  for (const entry of Object.entries(attributes)) {
    const [key, value] = entry;
    el[key] = value;
  }

  return el;
};

const main = async () => {
  const cards = await getCards();
  createCardsList(cards);
};

const createCardsList = (cards) => {
  root.innerHTML = "";

  cards.forEach((card) => {
    const div = create("div");
    const h1 = create("h1", { innerText: card.name });

    const img = create("img", {
      src: card.image_uris.png,
      width: 300,
    });

    div.append(h1, img);
    root.append(div);
  });
};

main().catch((err) => {
  console.log(err);
  // ui for error handling
});
