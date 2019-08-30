import { connect } from 'react-redux';
import Perfil from './Perfil';
import { fetchUserInfo, modifyMail, getHistoricValues, uploadPhoto } from './PerfilAction';

function mapStateToProps(state) {
  return {
    fetchingUserInfo: state.perfil.fetchingUserInfo,
    modifyingMail: state.perfil.modifyingMail,
    uploadingPhoto: state.perfil.uploadingPhoto,
    gettingHistoricValues: state.perfil.gettingHistoricValues,
    fetchError: state.perfil.fetchError,
    getHistoricError: state.perfil.getHistoricError,
    fetchModifyMailError: state.perfil.fetchModifyMailError,
    historicValues: state.perfil.historicValues,
    userInfo: state.perfil.userInfo,
    photoUploaded: state.perfil.photoUploaded
  };
}

export default connect(mapStateToProps, { fetchUserInfo, modifyMail, getHistoricValues, uploadPhoto })(Perfil);
