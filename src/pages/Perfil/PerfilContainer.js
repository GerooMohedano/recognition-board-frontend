import { connect } from 'react-redux';
import Perfil from './Perfil';
import { fetchUserInfo, modifyMail } from './PerfilAction';

function mapStateToProps(state) {
  return {
    fetchingUserInfo: state.perfil.fetchingUserInfo,
    userInfo: state.perfil.userInfo,
    fetchError: state.perfil.fetchError,
    modifyingMail: state.perfil.fetchingUserInfo,
    fetchModifyMailError: state.perfil.fetchError
  };
}

export default connect(mapStateToProps, { fetchUserInfo, modifyMail })(Perfil);
