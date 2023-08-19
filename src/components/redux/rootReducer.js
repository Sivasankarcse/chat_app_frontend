import { combineReducers } from 'redux'
import {reducer} from './reducer'
import { useReducer } from 'react'
import { addCountReducer } from './addCountReducer'

export default combineReducers({
    reducer,
    addCountReducer
})