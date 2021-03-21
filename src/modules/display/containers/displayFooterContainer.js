import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DisplayFooterComponent from '../components/footer';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    errors: state.displayReducer.errors,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      createFooter: Creators.createFooter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayFooterComponent);
