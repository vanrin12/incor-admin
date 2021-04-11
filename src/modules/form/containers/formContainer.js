import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customerComponent from '../components';

import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataAreas: state.partnerReducer.dataAreas,
    listName: state.customerReducer.listName,
    dataCustomer: state.customerReducer.dataCustomer,
    totalCustomer: state.customerReducer.totalCustomer,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      // getListCustomer: Creators.getListCustomer,
      getListAreas: partnerReducer.getListAreas,
      // getListName: Creators.getListName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(customerComponent);
