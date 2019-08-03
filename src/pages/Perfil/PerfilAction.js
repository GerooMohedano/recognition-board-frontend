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

export function modifyingMail() {
  return {
    type: types.MODIFYING_MAIL,
    payload: {}
  };
}

export function modifyMailSuccess(data) {
  return {
    type: types.MODIFY_MAIL_SUCCESS,
    modifiedMail: data
  };
}


export function modifyMailFailure(error) {
  return {
    type: types.MODIFY_MAIL_FAILURE,
    payload: error
  };
}

export function modifyMail(newMailInfo) {
  return function (dispatch) {
    dispatch(modifyingMail());
    return request.post(`${baseUrl()}/modificarMailUsuario`, newMailInfo)
      .then(response => dispatch(modifyMailSuccess(response)))
      .catch(error => dispatch(modifyMailFailure(error)));
  };
}
