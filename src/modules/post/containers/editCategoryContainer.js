import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editCategoryComponent from '../components/editCategory';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.postReducer.type,
    isProcessing: state.postReducer.isProcessing,
    dataCategories: state.postReducer.dataCategories,
    dataParent: state.postReducer.dataParent,
    categoriesDetail: state.postReducer.categoriesDetail,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListCategories: Creators.getListCategories,
      deleteCategories: Creators.deleteCategories,
      getListParent: Creators.getListParent,
      getCategoriesDetail: Creators.getCategoriesDetail,
      updateCategories: Creators.updateCategories,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editCategoryComponent);
