import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from '../components/header';

import { Creators } from '../redux';
import { Creators as CreatorsCategory } from '../../post/redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataCategories: state.postReducer.dataCategories,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListCategories: CreatorsCategory.getListCategories,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
