import { connect } from 'react-redux';
import AppLayout from './AppLayout';
import { fetchGeneralUserInfo, fetchGeneralAdminInfo, createEnterprise, changePassword } from './AppLayoutActions';

function mapStateToProps(state) {
  return {
    fetchingGeneralUserInfo: state.appLayout.fetchingGeneralUserInfo,
    creattingEnterprise: state.appLayout.creattingEnterprise,
    changingPassword: state.appLayout.changingPassword,
    userInfo: state.appLayout.userInfo,
    enterpriseCreated: state.appLayout.enterpriseCreated,
    passwordChanged: state.appLayout.passwordChanged,
    fetchError: state.appLayout.fetchError,
    changePasswordError: state.appLayout.changePasswordError
  };
}

export default connect(mapStateToProps, { fetchGeneralUserInfo, fetchGeneralAdminInfo, createEnterprise, changePassword })(AppLayout);
