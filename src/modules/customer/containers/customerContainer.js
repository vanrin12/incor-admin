import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customerComponent from '../components';

import { Creators } from '../redux';
import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    dataAreas: state.partnerReducer.dataAreas,
    dataConstant: state.partnerReducer.dataConstant,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPost: Creators.getListPost,
      getListAreas: partnerReducer.getListAreas,
      getListConstant: partnerReducer.getListConstant,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(customerComponent);
