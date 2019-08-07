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

export function gettingHistoricValues() {
  return {
    type: types.GETTING_HISTORIC_VALUES,
    payload: {}
  };
}

export function getHistoricValuesSuccess(data) {
  return {
    type: types.GET_HISTORIC_VALUES_SUCCESS,
    historicValues: data
  };
}


export function getHistoricValuesFailure(error) {
  return {
    type: types.GET_HISTORIC_VALUES_FAILURE,
    payload: error
  };
}

export function getHistoricValues(valuesInfo) {
  return function (dispatch) {
    dispatch(gettingHistoricValues());
    return request.post(`${baseUrl()}/HistoricoValorUsuario`, valuesInfo)
      .then(response => dispatch(getHistoricValuesSuccess(response)))
      .catch(error => dispatch(getHistoricValuesFailure(error)));
  };
}

export function gettingEveryAward() {
  return {
    type: types.GETTING_EVERY_AWARD,
    payload: {}
  };
}

export function getEveryAwardSucces(data) {
  return {
    type: types.GET_EVERY_AWARD_SUCCESS,
    everyAward: data
  };
}


export function getEveryAwardFailure(error) {
  return {
    type: types.GET_EVERY_AWARD_FAILURE,
    payload: error
  };
}

export function getEveryAward(userId) {
  return function (dispatch) {
    dispatch(gettingEveryAward());
    return request.post(`${baseUrl()}/logrosUsuario`, userId)
      .then(response => dispatch(getEveryAwardSucces(response)))
      .catch(error => dispatch(getEveryAwardFailure(error)));
  };
}
