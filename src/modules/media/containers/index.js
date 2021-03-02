import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mediaComponent from '../components';
import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.customerReducer.type,
    isProcessing: '',
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListMedia: Creators.getListMedia,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(mediaComponent);
