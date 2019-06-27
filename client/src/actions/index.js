import * as types from './../constants/ActionTypes'
import callApi from './../utils/apiCaller'

export const listAll = () => {
   return {
      type: types.LIST_ALL,
   }
}

export const actLuuDanhSachBacTai = () => {
   return dispatch => {
      return callApi('danh-sach-bac-tai', 'POST', null).then(res => {
         dispatch(actLayDanhSachBacTai(res.data))
      })
   }
}

export const actLayDanhSachBacTai = (danhsachbactai) => {
   return {
      type: types.DANHSACHBACTAI,
      danhsachbactai, //danhsachbactai: danhsachbactai
   }
}