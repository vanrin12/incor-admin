import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import progressProjectComponent from '../components/progressProject';

import { Creators } from '../redux';
// import { Creators as partnerReducer } from '../../partner/redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: state.customerReducer.isProcessing,
    listProject: state.customerReducer.listProject,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListProject: Creators.getListProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressProjectComponent);
