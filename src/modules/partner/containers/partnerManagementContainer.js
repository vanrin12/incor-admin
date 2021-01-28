import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import partnerManagementComponent from '../components/partnerManagement';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.partnerReducer.type,
    isProcessing: state.partnerReducer.isProcessing,
    dataQuotes: state.partnerReducer.dataQuotes,
    dataProducts: state.partnerReducer.dataProducts,
    dataConstructions: state.partnerReducer.dataConstructions,
    totalPartnerManagement: state.partnerReducer.totalPartnerManagement,
    dataPartnerManagement: state.partnerReducer.dataPartnerManagement,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPartnerManagement: Creators.getListPartnerManagement,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(partnerManagementComponent);
