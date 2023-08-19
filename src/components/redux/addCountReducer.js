import { DECREMENT_VALUE, INCREMENT_VALUE } from "./constants"

const initialState = {
    available: 0
}

export const addCountReducer = (state=initialState, action) => {
    switch (action.type) {
        case INCREMENT_VALUE:
            console.log("im increment_val state", state.available)
            console.log("im increment_val actio", action.data.available)
            var currentState = action.data.available
            return {
                ...state,
                available: currentState + 1
            }
        case DECREMENT_VALUE:
            return {
                ...state,
                available: state.available - 1
            }
        default: 
            return state
    }
}       