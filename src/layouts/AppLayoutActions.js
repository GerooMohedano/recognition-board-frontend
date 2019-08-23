import * as types from './AppLayoutConstants';
import { baseUrl } from '../shared/jsUtils/Utils';
import request from '../shared/jsUtils/request';

export function fetchingGeneralUserInfo() {
  return {
    type: types.FETCHING_GENERAL_USER_INFO,
    payload: {}
  };
}

export function fetchGeneralUserInfoSuccess(data) {
  return {
    type: types.FETCH_GENERAL_USER_INFO_SUCCESS,
    userInfo: data
  };
}

export function fetchGeneralUserInfoFailure(error) {
  return {
    type: types.FETCH_GENERAL_USER_INFO_FAILURE,
    payload: error
  };
}

export function fetchGeneralUserInfo(idUser) {
  return function (dispatch) {
    dispatch(fetchingGeneralUserInfo());
    return request.post(`${baseUrl()}/sideMenuInfo`, idUser)
      .then(response => dispatch(fetchGeneralUserInfoSuccess(response)))
      .catch(error => dispatch(fetchGeneralUserInfoFailure(error)));
  };
}

export function creattingEnterprise() {
  return {
    type: types.CREATTING_ENTERPRISE,
    payload: {}
  };
}

export function createEnterpriseSuccess(data) {
  return {
    type: types.CREATE_ENTERPRISE_SUCCESS,
    enterpriseCreated: data
  };
}

export function createEnterpriseFailure(error) {
  return {
    type: types.CREATE_ENTERPRISE_FAILURE,
    payload: error
  };
}

export function createEnterprise(enterpriseToCreate) {
  return function (dispatch) {
    dispatch(creattingEnterprise());
    return request.post(`${baseUrl()}/altaEmpresa`, enterpriseToCreate)
      .then(response => dispatch(createEnterpriseSuccess(response)))
      .catch(error => dispatch(createEnterpriseFailure(error)));
  };
}
