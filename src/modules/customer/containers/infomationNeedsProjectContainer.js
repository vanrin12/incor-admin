import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import informationNeedsProjectComponent from '../components/informationNeedsProject';

import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataDetailProject: state.customerReducer.dataDetailProject,
    dataAreas: state.partnerReducer.dataAreas,
    listSpaceType: state.customerReducer.listSpaceType,
    listDivision: state.customerReducer.listDivision,
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(informationNeedsProjectComponent);
