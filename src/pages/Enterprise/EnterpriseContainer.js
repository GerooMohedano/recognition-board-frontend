import { connect } from 'react-redux';
import Enterprise from './Enterprise';
import { fetchEnterpriseInfo } from './EnterpriseAction';

function mapStateToProps(state) {
  return {
    fetchingEnterpriseInfo: state.fetchingEnterpriseInfo,
    enterpriseInfo: state.enterpriseInfo,
    fetchError: state.fetchError
  };
}

export default connect(mapStateToProps, { fetchEnterpriseInfo })(Enterprise);
