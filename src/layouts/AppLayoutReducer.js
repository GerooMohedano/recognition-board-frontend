import generateReducer from '../shared/helpers/reducerHelpers';
import * as types from './AppLayoutConstants';

const INITIAL_STATE = {
  fetchingGeneralUserInfo: true,
  creattingEnterprise: true,
  fetchError: {
    state: false,
    message: ''
  },
  createEnterpriseError: {
    state: false,
    message: ''
  },
  userInfo: {},
  enterpriseCreated: {}
};

const behaviors = {
  [types.FETCHING_GENERAL_USER_INFO](state) {
    return Object.assign({}, state, { fetchingGeneralUserInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_GENERAL_USER_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { userInfo: action.userInfo, fetchingGeneralUserInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_GENERAL_USER_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingGeneralUserInfo: false, fetchError: { state: true, message: action.payload } });
  },
  [types.CREATTING_ENTERPRISE](state) {
    return Object.assign({}, state, { creattingEnterprise: true, createEnterpriseError: { state: false, message: '' } });
  },
  [types.CREATE_ENTERPRISE_SUCCESS](state, action) {
    return Object.assign({}, state, { enterpriseCreated: action.enterpriseCreated, creattingEnterprise: false, createEnterpriseError: { state: false, message: '' } });
  },
  [types.CREATE_ENTERPRISE_FAILURE](state, action) {
    return Object.assign({}, state, { creattingEnterprise: false, createEnterpriseError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
