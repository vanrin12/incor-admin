import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import progressProjectComponent from '../components/progressProject';
import { Creators as partnerReducer } from '../../partner/redux';
import { Creators as CreatorsDisplay } from 'modules/display/redux';
import { Creators } from '../redux';
import { Creators as postReducer } from '../../post/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    listProject: state.customerReducer.listProject,
    dataDetailCustomer: state.customerReducer.dataDetailCustomer,
    dataAreas: state.partnerReducer.dataAreas,
    totalConstruction: state.customerReducer.totalConstruction,
    dataParent: state.postReducer.dataParent,
    listHashtag: state.displayReducer.listHashtag,
    listTableConstructionProject:
      state.customerReducer.listTableConstructionProject,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListProject: Creators.getListProject,
      getListConstructionCustomer: Creators.getListConstructionCustomer,
      registerConstructionCustomer: Creators.registerConstructionCustomer,
      getListParent: postReducer.getListParent,
      getDetailCustomer: Creators.getDetailCustomer,
      getListAreas: partnerReducer.getListAreas,
      updateCustomer: Creators.updateCustomer,
      getDataFooter: CreatorsDisplay.getDataFooter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressProjectComponent);
