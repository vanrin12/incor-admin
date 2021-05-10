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
    dataConstant: state.partnerReducer.dataConstant,
    dataScales: state.partnerReducer.dataScales,
    dataDetailPartnerProduct: state.partnerReducer.dataDetailPartnerProduct,
    dataDetailPartnerConstruction:
      state.partnerReducer.dataDetailPartnerConstruction,
    totalQuotes: state.partnerReducer.totalQuotes,
    uploadImageConstruction: state.partnerReducer.uploadImageConstruction,
    dataAreas: state.partnerReducer.dataAreas,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPartnerManagement: Creators.getListPartnerManagement,
      registerPartnerCompany: Creators.registerPartnerCompany,
      getListScales: Creators.getListScales,
      getListPartnerProduct: Creators.getListPartnerProduct,
      getListConstruction: Creators.getListConstruction,
      registerPartnerProduct: Creators.registerPartnerProduct,
      registerPartnerConstruction: Creators.registerPartnerConstruction,
      getListPartnerQuote: Creators.getListPartnerQuote,
      getDetailPartnerProduct: Creators.getDetailPartnerProduct,
      updatePartnerProduct: Creators.updatePartnerProduct,
      getDetailPartnerConstruction: Creators.getDetailPartnerConstruction,
      updatePartnerConstruction: Creators.updatePartnerConstruction,
      resetType: Creators.resetType,
      deleteImage: Creators.deleteImage,
      deleteConstruction: Creators.deleteConstruction,
      deletePartnerProduct: Creators.deletePartnerProduct,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(partnerManagementComponent);
