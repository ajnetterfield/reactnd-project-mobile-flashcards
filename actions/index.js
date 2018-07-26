import { createDeck } from '../utils/api';

export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
});

export const handleAddDeck = (title) => (dispatch) => {
  return createDeck(title)
    .then((deck) => {
      dispatch(addDeck(deck));
    });
};
