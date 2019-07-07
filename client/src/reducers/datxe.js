import * as types from '../constants/ActionTypes'

const initState = false

export default function datxe(state = initState, action) {
   switch (action.type) {
      case types.INCREASE:
         return !state
            
      default: 
         return state
   }
}