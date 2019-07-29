import * as types from './PerfilConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingTrends() {
  return {
    type: types.FETCHING_TRENDS,
    payload: {}
  };
}

export function fetchTrendsSuccess(data) {
  const jobs = [];
  Object.keys(data.data).forEach(
    (job) => {
      const elem = {};
      elem.index = job;
      elem.values = data.data[job];
      jobs.push(elem);
    }
  );
  return {
    type: types.FETCH_TRENDS_SUCCESS,
    payload: { trends: jobs }
  };
}

export function fetchTrendsFailure(error) {
  return {
    type: types.FETCH_TRENDS_FAILURE,
    payload: error
  };
}

export function fetchTrends() {
  return function (dispatch) {
    dispatch(fetchingTrends());
    return request.get(`${baseUrl()}/api/trend`)
      .then(response => dispatch(fetchTrendsSuccess(response)))
      .catch(error => dispatch(fetchTrendsFailure(error)));
  };
}
