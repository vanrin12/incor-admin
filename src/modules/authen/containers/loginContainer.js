import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginComponent from '../components';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.authReducer.type,
    isProcessing: state.authReducer.isProcessing,
    errors: state.authReducer.errors,
    token: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      signIn: Creators.signIn,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
