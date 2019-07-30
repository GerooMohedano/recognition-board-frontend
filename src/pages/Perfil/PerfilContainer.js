import { connect } from 'react-redux';
import Perfil from './Perfil';
import { fetchUserInfo } from './PerfilAction';

function mapStateToProps(state) {
  return {
    fetchingUserInfo: state.fetchingUserInfo,
    userInfo: state.userInfo,
    fetchError: state.fetchError
  };
}

export default connect(mapStateToProps, { fetchUserInfo })(Perfil);
