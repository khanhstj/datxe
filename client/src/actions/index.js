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

export const dongMoChiDuong_DatXe = () => ({type: types.DONGMO_CHIDUONG_DATXE})

export const dongMoChiDuong_BacTai = () => ({type: types.DONGMO_CHIDUONG_BACTAI})

export const chayXe_TamDung_BacTai = () => ({type: types.CHAYXE_TAMDUNG_BACTAI})