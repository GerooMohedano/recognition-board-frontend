import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './PerfilConstants';

const INITIAL_STATE = {
  fetchingUserInfo: true,
  modifyingMail: true,
  gettingHistoricValues: true,
  uploadingPhoto: true,
  fetchError: {
    state: false,
    message: ''
  },
  fetchModifyMailError: {
    state: false,
    message: ''
  },
  getHistoricError: {
    state: false,
    message: ''
  },
  uploadPhotoError: {
    state: false,
    message: ''
  },
  userInfo: {},
  historicValues: {},
  photoUploaded: {}
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
  },
  [types.MODIFYING_MAIL](state) {
    return Object.assign({}, state, { modifyingMail: true, fetchModifyMailError: { state: false, message: '' } });
  },
  [types.MODIFY_MAIL_SUCCESS](state, action) {
    return Object.assign({}, state, { modifyingMail: false, fetchModifyMailError: { state: false, message: '' } });
  },
  [types.MODIFY_MAIL_FAILURE](state, action) {
    return Object.assign({}, state, { modifyingMail: false, fetchModifyMailError: { state: true, message: action.payload } });
  },
  [types.GETTING_HISTORIC_VALUES](state) {
    return Object.assign({}, state, { gettingHistoricValues: true, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_SUCCESS](state, action) {
    return Object.assign({}, state, { historicValues: action.historicValues, gettingHistoricValues: false, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingHistoricValues: false, getHistoricError: { state: true, message: action.payload } });
  },
  [types.UPLOADING_PHOTO](state) {
    return Object.assign({}, state, { uploadingPhoto: true, uploadPhotoError: { state: false, message: '' } });
  },
  [types.UPLOAD_PHOTO_SUCCESS](state, action) {
    return Object.assign({}, state, { photoUploaded: action.photoUploaded, uploadingPhoto: false, uploadPhotoError: { state: false, message: '' } });
  },
  [types.UPLOAD_PHOTO_FAILURE](state, action) {
    return Object.assign({}, state, { uploadingPhoto: false, uploadPhotoError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
