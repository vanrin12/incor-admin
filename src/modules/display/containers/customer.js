import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerComponent from '../components/customer';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataCustomer: state.displayReducer.dataCustomer,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getCustomerEXP: Creators.getCustomerEXP,
      updateCustomerEXP: Creators.updateCustomerEXP,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);
