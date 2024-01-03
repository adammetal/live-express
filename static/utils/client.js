export const getCards = async () => {
  const response = await fetch('/api/cards');
  const cards = await response.json();
  return cards;
}

