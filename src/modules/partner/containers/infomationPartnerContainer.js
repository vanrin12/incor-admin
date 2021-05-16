import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import informationPartnerComponent from '../components/informationPartner';
import { Creators as CustomerReducer } from '../../customer/redux';
import { Creators as CreatorsDisplay } from '../../display/redux';
import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataDetailProject: state.customerReducer.dataDetailProject,
    dataAreas: state.partnerReducer.dataAreas,
    listSpaceType: state.customerReducer.listSpaceType,
    listDivision: state.customerReducer.listDivision,
    tableDetailProject: state.customerReducer.tableDetailProject,
    listHashtag: state.displayReducer.listHashtag,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailProject: CustomerReducer.getDetailProject,
      getListAreas: Creators.getListAreas,
      getListSpaceType: CustomerReducer.getListSpaceType,
      getListDivision: CustomerReducer.getListDivision,
      registerProjectItem: CustomerReducer.registerProjectItem,
      registerProject: CustomerReducer.registerProject,
      resetData: CustomerReducer.resetData,
      getDataFooter: CreatorsDisplay.getDataFooter,
      deleteProjectItem: CustomerReducer.deleteProjectItem,
      updateProjectItem: CustomerReducer.updateProjectItem,
      updateProject: CustomerReducer.updateProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(informationPartnerComponent);
