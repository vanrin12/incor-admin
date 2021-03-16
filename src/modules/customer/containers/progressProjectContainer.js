import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import progressProjectComponent from '../components/progressProject';

import { Creators } from '../redux';
import { Creators as postReducer } from '../../post/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    listProject: state.customerReducer.listProject,
    dataDetailCustomer: state.customerReducer.dataDetailCustomer,
    dataAreas: state.partnerReducer.dataAreas,
    listConstructionCustomer: state.customerReducer.listConstructionCustomer,
    listTableConstruction: state.customerReducer.listTableConstruction,
    totalConstruction: state.customerReducer.totalConstruction,
    dataParent: state.postReducer.dataParent,
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressProjectComponent);
