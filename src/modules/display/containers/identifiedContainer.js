import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Identified from '../components/identified';

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
      createFooter: Creators.createFooter,
      getDataFooter: Creators.getDataFooter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Identified);
