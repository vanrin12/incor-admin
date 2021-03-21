import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mediaComponent from '../components';
import { Creators } from '../redux';

const mapStateToProps = (state) => {
  return {
    type: state.mediaReducer.type,
    isProcessing: state.mediaReducer.isProcessing,
    dataListMedia: state.mediaReducer.dataListMedia,
    totalRows: state.mediaReducer.totalRows,
    isProcessingUpload: state.mediaReducer.isProcessingUpload,
    isProcessingDelete: state.mediaReducer.isProcessingDelete,
    statusCode: state.mediaReducer.statusCode,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListMedia: Creators.getListMedia,
      uploadMedia: Creators.uploadMedia,
      deleteMedia: Creators.deleteMedia,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(mediaComponent);
