import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

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
        case ADD_CARD:
            let newstate = Object.assign({}, state)
            newstate.decks.find((d) => d.title === action.title).questions.push(action.card)
            return newstate
        default:
            return state
    }
}

export default card