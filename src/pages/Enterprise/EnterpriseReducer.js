import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './EnterpriseConstants';

const INITIAL_STATE = {
  fetchingEnterpriseInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  enterpriseInfo: {}
};


const behaviors = {
  [types.FETCHING_ENTERPRISE_INFO](state) {
    return Object.assign({}, state, { fetchingEnterpriseInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_ENTERPRISE_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { enterpriseInfo: action.enterpriseInfo, fetchingEnterpriseInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_ENTERPRISE_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingEnterpriseInfo: false, fetchError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
