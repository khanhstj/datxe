import * as types from '../constants/ActionTypes'

var initialState = []

var danhsachbactai = (state = initialState, action) => {
   switch(action.type) {
      case types.DANHSACHBACTAI:
         state = action.danhsachbactai
         return state
      default: return state
   }

   
}

export default danhsachbactai