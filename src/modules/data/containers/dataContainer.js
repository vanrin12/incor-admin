import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataComponent from '../components';
import { Creators as CreatorsDisplay } from 'modules/display/redux';
import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataFooter: state.displayReducer.dataFooter,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataFooter: CreatorsDisplay.getDataFooter,
      createFooter: CreatorsDisplay.createFooter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
