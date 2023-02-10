import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import mainReducer from '../reducers'
import {createStore} from 'redux'

const store=createStore(
    mainReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;