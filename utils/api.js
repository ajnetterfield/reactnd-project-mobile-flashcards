import { AsyncStorage } from 'react-native';

const DECKS_KEY = 'MobileFlashcards:decks';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse);
};

export const getDeck = (title) => {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((decks) => decks[title]);
};

export const createDeck = (title) => {
  const deck = {
    title,
    cards: []
  };

  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [title]: deck
  })).then(() => {
    return deck;
  });
};

export const addCardToDeck = (title, card) => {
  return getDeck(title)
    .then((deck) => {
      if (deck) {
        return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
          [title]: {
            ...deck,
            cards: [
              ...deck.cards,
              card
            ]
          }
        }));
      }
    })
    .then(() => {
      return card;
    });
}
