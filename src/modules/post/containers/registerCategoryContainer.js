import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerCategoryComponent from '../components/registerCategory';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.postReducer.type,
    isProcessing: state.postReducer.isProcessing,
    dataCategories: state.postReducer.dataCategories,
    dataParent: state.postReducer.dataParent,
    totalCategory: state.postReducer.totalCategory,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListCategories: Creators.getListCategories,
      deleteCategories: Creators.deleteCategories,
      registerCategories: Creators.registerCategories,
      getListParent: Creators.getListParent,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registerCategoryComponent);
