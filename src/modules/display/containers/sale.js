import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaleComponent from '../components/sale';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataSaleMap: state.displayReducer.dataSaleMap,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDataMap: Creators.getDataMap,
      updateSaleMap: Creators.updateSaleMap,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SaleComponent);
