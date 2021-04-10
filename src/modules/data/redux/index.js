// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getContentData: null,
  getContentDataSuccess: null,
  getContentDataFailed: null,
  resetType: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
});

const getContentData = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getContentDataSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getContentDataFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_CONTENT_DATA]: getContentData,
  [Types.GET_CONTENT_DATA_SUCCESS]: getContentDataSuccess,
  [Types.GET_CONTENT_DATA_FAILED]: getContentDataFailed,
};

// Create reducers by pass state and handlers
export const dataReducer = createReducer(INITIAL_STATE, HANDLERS);
