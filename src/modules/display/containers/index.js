import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DisplayComponent from '../components/AboutUs';

import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.displayReducer.type,
    isProcessing: state.displayReducer.isProcessing,
    dataAboutUs: state.displayReducer.dataAboutUs,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getAboutUs: Creators.getAboutUs,
      updateAboutUs: Creators.updateAboutUs,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComponent);
