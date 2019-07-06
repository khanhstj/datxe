import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import danhsachbactai from './danhsachbactai'
import datxe from './datxe'

const Reducers = combineReducers({
   danhsachbactai,
   datxe: datxe
})

const appReducers = createStore(Reducers,
   compose(applyMiddleware(thunk))
)

export default appReducers