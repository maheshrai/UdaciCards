import { RECEIVE_DECKS, ADD_DECK } from '../actions'

function card(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return Object.assign({}, state, {
                decks: action.decks
            })
        case ADD_DECK:
            return Object.assign({}, state, {
                decks: [...state.decks, action.deck]
            })
        default:
            return state
    }
}

export default card