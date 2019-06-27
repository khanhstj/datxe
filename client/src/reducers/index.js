import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import danhsachbactai from './danhsachbactai'

const Reducers = combineReducers({
   danhsachbactai,
   
})

const appReducers = createStore(Reducers,
   compose(applyMiddleware(thunk))
)

export default appReducers