import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './PerfilConstants';

const INITIAL_STATE = {
  fetchingUserInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  userInfo: {}
};

const behaviors = {
  [types.FETCHING_USER_INFO](state) {
    return Object.assign({}, state, { fetchingUserInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_USER_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { userInfo: action.userInfo, fetchingUserInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_USER_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingUserInfo: false, fetchError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
