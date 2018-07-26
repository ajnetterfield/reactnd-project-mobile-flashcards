import { AsyncStorage } from 'react-native';

const DECKS_KEY = 'MobileFlashcards:decks';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((decks) => {
      if (decks) {
        return JSON.parse(decks);
      }

      return {};
    });
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
