import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postComponent from '../components';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.postReducer.type,
    isProcessing: state.postReducer.isProcessing,
    listPost: state.postReducer.listPost,
    totalPost: state.postReducer.totalPost,
    listAllCategories: state.postReducer.listAllCategories,
    listAllSeoTitle: state.postReducer.listAllSeoTitle,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPost: Creators.getListPost,
      getListAllCategories: Creators.getListAllCategories,
      getListAllSeoTitle: Creators.getListAllSeoTitle,
      deletePost: Creators.deletePost,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(postComponent);
