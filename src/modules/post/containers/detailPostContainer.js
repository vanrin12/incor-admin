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
    dataPostDetail: state.postReducer.dataPostDetail,
    listCategoryPost: state.postReducer.listCategoryPost,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListAllCategories: Creators.getListAllCategories,
      updatePost: Creators.updatePost,
      getPostDetail: Creators.getPostDetail,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detailPostComponent);
