import { addCardToDeck, createDeck } from '../utils/api';

export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export const addCard = (title, card) => ({
  type: ADD_CARD,
  title,
  card
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
});

export const handleAddCard = (title, newCard) => (dispatch) => {
  return addCardToDeck(title, newCard)
    .then((card) => {
      dispatch(addCard(title, card));
    });
};

export const handleAddDeck = (title) => (dispatch) => {
  return createDeck(title)
    .then((deck) => {
      dispatch(addDeck(deck));
    });
};
