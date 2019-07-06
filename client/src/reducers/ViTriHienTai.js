import * as types from '../constants/ActionTypes'

var initialState = []

var ViTriHienTai = (state = initialState, action) => {
   switch(action.type) {
      case types.VITRIHIENTAI:
         state = action.ViTriHienTai
         return state
      default: return state
   }

   
}

export default ViTriHienTai