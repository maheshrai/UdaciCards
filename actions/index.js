export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
import { saveDeckTitle, addCardToDeck } from '../utils/api'

export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks
})

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
})

export const addCard = (title, card) => ({
    type: ADD_CARD,
    title,
    card
})

export const addNewDeck = (title) => dispatch => (
    saveDeckTitle(title).then((deck) => dispatch(addDeck(deck)))
)

export const addNewCard = (title, card) => dispatch => (
    addCardToDeck(title, card).then((card) => dispatch(addCard(title, card)))
)