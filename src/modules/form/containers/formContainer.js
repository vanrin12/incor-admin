import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customerComponent from '../components';

import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';
import { Creators as customerReducer } from '../../customer/redux';

const mapStateToProps = (state) => {
  return {
    type: state.formReducer.type,
    isProcessing: state.formReducer.isProcessing,
    dataAreas: state.partnerReducer.dataAreas,
    dataFormRequest: state.formReducer.dataFormRequest,
    totalRequest: state.formReducer.totalRequest,
    listSpaceType: state.customerReducer.listSpaceType,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getFormRequest: Creators.getFormRequest,
      getListAreas: partnerReducer.getListAreas,
      getListSpaceType: customerReducer.getListSpaceType,
      deleteFormRequest: Creators.deleteFormRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(customerComponent);
