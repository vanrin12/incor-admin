import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import detailPostComponent from '../components/detailPost';

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
      getPostDetail: Creators.getPostDetail,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detailPostComponent);
