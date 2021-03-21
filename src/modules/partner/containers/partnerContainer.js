import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import partnerComponent from '../components';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.partnerReducer.type,
    isProcessing: state.partnerReducer.isProcessing,
    dataAreas: state.partnerReducer.dataAreas,
    dataConstant: state.partnerReducer.dataConstant,
    dataPartner: state.partnerReducer.dataPartner,
    totalPartner: state.partnerReducer.totalPartner,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListAreas: Creators.getListAreas,
      getListConstant: Creators.getListConstant,
      getListPartner: Creators.getListPartner,
      deletePartner: Creators.deletePartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(partnerComponent);
