import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changePasswordComponent from '../components/changePass';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.authReducer.type,
    isProcessing: state.authReducer.isProcessing,
    errorMsg: state.authReducer.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      changePassword: Creators.changePassword,
      resetType: Creators.resetType,
      logOut: Creators.logOut,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changePasswordComponent);
