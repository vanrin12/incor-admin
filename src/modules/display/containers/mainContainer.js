import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainComponent from '../components/main';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    typeRequest: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataListSlider: state.displayReducer.dataListSlider,
    titleSlider: state.displayReducer.titleSlider,
    statusCode: state.displayReducer.statusCode,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListSlider: Creators.getListSlider,
      deleteSlider: Creators.deleteSlider,
      updateListSlider: Creators.updateListSlider,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
