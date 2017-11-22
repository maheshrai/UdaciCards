import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function card(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            let cnt = 0
            action.decks.forEach(function (deck) {
                cnt += deck.questions.length
            })
            return Object.assign({}, state, {
                decks: action.decks,
                flashCardCount: cnt
            })
        case ADD_DECK:
            return Object.assign({}, state, {
                decks: [...state.decks, action.deck]
            })
        case ADD_CARD:
            let newstate = Object.assign({}, state)
            newstate.decks.find((d) => d.title === action.title).questions.push(action.card)
            newstate.flashCardCount = newstate.flashCardCount + 1
            return newstate
        default:
            return state
    }
}

export default card