import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mediaComponent from '../components';
import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.mediaReducer.type,
    isProcessing: state.mediaReducer.isProcessing,
    dataListMedia: state.mediaReducer.dataListMedia,
    statusCode: state.mediaReducer.statusCode,
    totalRows: state.mediaReducer.totalRows,
    isProcessingUpload: state.mediaReducer.isProcessingUpload,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListMedia: Creators.getListMedia,
      uploadMedia: Creators.uploadMedia,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(mediaComponent);
