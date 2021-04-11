import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerProjectComponent from '../components/informationProjectRegister';
import { Creators as CreatorsDisplay } from 'modules/display/redux';
import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataDetailCustomer: state.customerReducer.dataDetailCustomer,
    dataAreas: state.partnerReducer.dataAreas,
    listSpaceType: state.customerReducer.listSpaceType,
    listDivision: state.customerReducer.listDivision,
    projectId: state.customerReducer.projectId,
    listHashtag: state.displayReducer.listHashtag,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getDetailCustomer: Creators.getDetailCustomer,
      getListAreas: partnerReducer.getListAreas,
      getListSpaceType: Creators.getListSpaceType,
      getListDivision: Creators.getListDivision,
      registerProject: Creators.registerProject,
      registerProjectItem: Creators.registerProjectItem,
      resetData: Creators.resetData,
      getDataFooter: CreatorsDisplay.getDataFooter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registerProjectComponent);
