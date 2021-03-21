import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaleComponent from '../components/sale';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataMap: Creators.getDataMap,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SaleComponent);
