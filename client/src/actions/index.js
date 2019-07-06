import * as types from './../constants/ActionTypes'
import callApi from './../utils/apiCaller'

export const actLuuDanhSachBacTai = () => {
   return dispatch => {
      return callApi('http://localhost:8797/danh-sach-bac-tai', 'POST', null).then(res => {
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

export const toogleChiDuong_DatXe = {
   type: types.TOOGLE_CHIDUONG_DATXE   
}

export const counterIncrease = () => ({type: types.INCREASE})