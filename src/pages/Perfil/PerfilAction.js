import * as types from './PerfilConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingUserInfo() {
  return {
    type: types.FETCHING_USER_INFO,
    payload: {}
  };
}

export function fetchUserInfoSuccess(data) {
  return {
    type: types.FETCH_USER_INFO_SUCCESS,
    userInfo: data
  };
}


export function fetchUserInfoFailure(error) {
  return {
    type: types.FETCH_USER_INFO_FAILURE,
    payload: error
  };
}

export function fetchUserInfo(idUsuario) {
  return function (dispatch) {
    dispatch(fetchingUserInfo());
    return request.get(`${baseUrl()}/perfil/${idUsuario}`)
      .then(response => dispatch(fetchUserInfoSuccess(response)))
      .catch(error => dispatch(fetchUserInfoFailure(error)));
  };
}
