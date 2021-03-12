import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerProjectComponent from '../components/informationProjectRegister';

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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registerProjectComponent);
