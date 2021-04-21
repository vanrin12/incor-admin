import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import informationNeedsProjectComponent from '../components/informationNeedsProject';
import { Creators } from '../redux';
import { Creators as CreatorsDisplay } from '../../display/redux';
import { Creators as partnerReducer } from '../../partner/redux';

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
      getDetailProject: Creators.getDetailProject,
      getListAreas: partnerReducer.getListAreas,
      getListSpaceType: Creators.getListSpaceType,
      getListDivision: Creators.getListDivision,
      registerProjectItem: Creators.registerProjectItem,
      registerProject: Creators.registerProject,
      resetData: Creators.resetData,
      getDataFooter: CreatorsDisplay.getDataFooter,
      deleteProjectItem: Creators.deleteProjectItem,
      updateProjectItem: Creators.updateProjectItem,
      updateProject: Creators.updateProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(informationNeedsProjectComponent);
