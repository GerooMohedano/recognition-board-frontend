import { connect } from 'react-redux';
import Enterprise from './Enterprise';
import { fetchEnterpriseInfo } from './EnterpriseAction';

function mapStateToProps(state) {
  return {
    fetchingEnterpriseInfo: state.enterprise.fetchingEnterpriseInfo,
    enterpriseInfo: state.enterprise.enterpriseInfo,
    fetchError: state.enterprise.fetchError
  };
}

export default connect(mapStateToProps, { fetchEnterpriseInfo })(Enterprise);
