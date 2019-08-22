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
