import generateReducer from '../shared/helpers/reducerHelpers';
import * as types from './AppLayoutConstants';

const INITIAL_STATE = {
  fetchingGeneralUserInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  userInfo: {}
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
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
