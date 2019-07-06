import * as types from '../constants/ActionTypes'

var initialState = []

var trangthaichiduongdatxe = (state = initialState, action) => {
   switch(action.type) {
      case types.TRANGTHAICHIDUONG_DATXE:
         let newState = {...state}
         state = action.trangthaichiduongdatxe
         newState = !state
         return newState
      default: return state
   }

   
}

export default trangthaichiduongdatxe