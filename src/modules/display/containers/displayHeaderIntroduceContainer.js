import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IntroduceComponent from '../components/header/introduce';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    errors: state.displayReducer.errors,
    valueHeader: state.displayReducer.valueHeader,
    dataCategories: state.postReducer.dataCategories,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      createIntroduce: Creators.createIntroduce,
      getValueHeader: Creators.getValueHeader,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceComponent);
