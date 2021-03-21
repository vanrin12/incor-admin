import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customerDetailComponent from '../components/detailCustomer';

import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataDetailCustomer: state.customerReducer.dataDetailCustomer,
    dataAreas: state.partnerReducer.dataAreas,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailCustomer: Creators.getDetailCustomer,
      getListAreas: partnerReducer.getListAreas,
      updateCustomer: Creators.updateCustomer,
      deleteProject: Creators.deleteProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customerDetailComponent);
