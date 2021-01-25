import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerPostComponent from '../components/registerPost';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.postReducer.type,
    isProcessing: state.postReducer.isProcessing,
    listAllCategories: state.postReducer.listAllCategories,
    errorMsg: state.postReducer.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListAllCategories: Creators.getListAllCategories,
      registerPost: Creators.registerPost,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registerPostComponent);
