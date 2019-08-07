import * as types from './EnterpriseConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingEnterpriseInfo() {
  return {
    type: types.FETCHING_ENTERPRISE_INFO,
    payload: {}
  };
}

export function fetchEnterpriseInfoSuccess(data) {
  return {
    type: types.FETCH_ENTERPRISE_INFO_SUCCESS,
    enterpriseInfo: data
  };
}


export function fetchEnterpriseInfoFailure(error) {
  return {
    type: types.FETCH_ENTERPRISE_INFO_FAILURE,
    payload: error
  };
}

export function fetchEnterpriseInfo(idEmpresa) {
  return function (dispatch) {
    dispatch(fetchingEnterpriseInfo());
    return request.get(`${baseUrl()}/empresaConfig/${idEmpresa}`)
      .then(response => dispatch(fetchEnterpriseInfoSuccess(response)))
      .catch(error => dispatch(fetchEnterpriseInfoFailure(error)));
  };
}
