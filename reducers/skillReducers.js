import {requestStatus} from '../constants'

export const actionTypes={
  initial:'INITIAL',
  fetch:'FETCHING',
  success:'FETCH_SUCCESS',
  error:'FETCH_ERROR'
}

export const initialState = {
  languageList: [],
  requestStatus: requestStatus.idle,
}

export const skillReducers=(state,action)=>{
      switch(action.type){
        case actionTypes.initial:{
          return{
            languageList:[],
            requestStatus: requestStatus.idle
          }
        }
        case actionTypes.fetch:{ 
          return{
            ...state,
            requestStatus:requestStatus.loading
          }
        }
        case actionTypes.success:{
          return{
            languageList: action.payload.languageList,
            requestStatus:requestStatus.success
          }
        }
        case actionTypes.error:{
          return {
            languageList: [],
            requestStatus: requestStatus.error
          }
        }
        default:{
          throw new Error();
        }
      }
}