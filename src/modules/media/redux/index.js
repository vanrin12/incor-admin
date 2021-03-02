// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListMedia: ['data'],
  getListMediaSuccess: null,
  getListMediaFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCustomer: [],
  totalCustomer: '',
});

const getListMedia = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListMediaSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListMediaFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_MEDIA]: getListMedia,
  [Types.GET_LIST_MEDIA_SUCCESS]: getListMediaSuccess,
  [Types.GET_LIST_MEDIA_FAILED]: getListMediaFailed,
};

// Create reducers by pass state and handlers
export const mediaReducer = createReducer(INITIAL_STATE, HANDLERS);
