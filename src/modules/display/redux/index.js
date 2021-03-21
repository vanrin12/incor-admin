// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  createIntroduce: ['data'],
  createIntroduceSuccess: null,
  createIntroduceFailed: null,
  getValueHeader: ['data'],
  getValueHeaderSuccess: null,
  getValueHeaderFailed: null,
  createFooter: ['data'],
  createFooterSuccess: null,
  createFooterFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  type: '',
  valueHeader: {},
});

const createIntroduce = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
  });
};
const createIntroduceSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const createIntroduceFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors,
  });
};

const getValueHeader = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
  });
};
const getValueHeaderSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    valueHeader: action.data.map,
  });
};

const getValueHeaderFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors,
  });
};

const createFooter = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
  });
};
const createFooterSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const createFooterFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.CREATE_INTRODUCE]: createIntroduce,
  [Types.CREATE_INTRODUCE_SUCCESS]: createIntroduceSuccess,
  [Types.CREATE_INTRODUCE_FAILED]: createIntroduceFailed,

  [Types.GET_VALUE_HEADER]: getValueHeader,
  [Types.GET_VALUE_HEADER_SUCCESS]: getValueHeaderSuccess,
  [Types.GET_VALUE_HEADER_FAILED]: getValueHeaderFailed,

  [Types.CREATE_FOOTER]: createFooter,
  [Types.CREATE_FOOTER_SUCCESS]: createFooterSuccess,
  [Types.CREATE_FOOTER_FAILED]: createFooterFailed,
};

// Create reducers by pass state and handlers
export const displayReducer = createReducer(INITIAL_STATE, HANDLERS);
