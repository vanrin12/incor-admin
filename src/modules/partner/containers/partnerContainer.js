import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import partnerComponent from '../components/index';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.partnerReducer.type,
    isProcessing: state.partnerReducer.isProcessing,
    dataAreas: state.partnerReducer.dataAreas,
    dataScales: state.partnerReducer.dataScales,
    dataPartner: state.partnerReducer.dataPartner,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListAreas: Creators.getListAreas,
      getListScales: Creators.getListScales,
      getListPartner: Creators.getListPartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(partnerComponent);
