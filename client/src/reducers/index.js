import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import danhsachbactai from './danhsachbactai'
import datxe from './datxe'
import bactai from './bactai'

const Reducers = combineReducers({
   danhsachbactai,
   datxe: datxe,
   bactai: bactai
})

const appReducers = createStore(Reducers,
   compose(applyMiddleware(thunk))
)

export default appReducers