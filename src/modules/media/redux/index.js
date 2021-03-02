// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListMedia: ['data'],
  getListMediaSuccess: null,
  getListMediaFailed: null,

  uploadMedia: ['data'],
  uploadMediaSuccess: null,
  uploadMediaFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataListMedia: [],
  statusCode: 0,
  isProcessingUpload: false,
  totalRows: 0,
});

const getListMedia = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    totalRows: 0,
  });
};

const getListMediaSuccess = (state, action) => {
  const { medias } = action.data;
  const dataListMedia =
    medias &&
    medias.data &&
    medias.data.map((item, index) => {
      return {
        id: index + 1,
        name: item.name,
        url: item.url,
        type: item.type,
      };
    });
  return state.merge({
    isProcessing: false,
    type: action.type,
    totalRows:
      (medias &&
        medias.meta &&
        medias.meta.pagination &&
        medias.meta.pagination.total) ||
      0,
    dataListMedia,
  });
};

const getListMediaFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    totalRows: 0,
  });
};

const uploadMedia = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessingUpload: true,
  });
};

const uploadMediaSuccess = (state, action) => {
  const { status, data } = action.data;
  const dataListMediaNew = state && state.dataListMedia;
  const totalRows = state && state.totalRows;
  return state.merge({
    type: action.type,
    statusCode: status && status.code,
    isProcessingUpload: false,
    totalRows: totalRows + 1,
    dataListMedia:
      totalRows < 10
        ? [
            ...dataListMediaNew,
            {
              id: data && data.media && data.media.id,
              name: data && data.media && data.media.name,
              url: data && data.media && data.media.url,
              type: data && data.media && data.media.type,
            },
          ]
        : dataListMediaNew,
  });
};

const uploadMediaFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error,
    isProcessingUpload: false,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_MEDIA]: getListMedia,
  [Types.GET_LIST_MEDIA_SUCCESS]: getListMediaSuccess,
  [Types.GET_LIST_MEDIA_FAILED]: getListMediaFailed,

  [Types.UPLOAD_MEDIA]: uploadMedia,
  [Types.UPLOAD_MEDIA_SUCCESS]: uploadMediaSuccess,
  [Types.UPLOAD_MEDIA_FAILED]: uploadMediaFailed,
};

// Create reducers by pass state and handlers
export const mediaReducer = createReducer(INITIAL_STATE, HANDLERS);
