// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getAboutUs: null,
  getAboutUsSuccess: null,
  getAboutUsFailed: null,

  updateAboutUs: ['data'],
  updateAboutUsSuccess: null,
  updateAboutUsFailed: null,

  getCustomerEXP: null,
  getCustomerEXPSuccess: null,
  getCustomerEXPFailed: null,

  updateCustomerEXP: ['data'],
  updateCustomerEXPSuccess: null,
  updateCustomerEXPFailed: null,

  getDataMap: ['data'],
  getDataMapSuccess: null,
  getDataMapFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  statusCode: 0,
  dataAboutUs: {},
  dataCustomer: {},
});

const getAboutUs = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getAboutUsSuccess = (state, action) => {
  const { data } = action;

  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAboutUs: data || {},
  });
};

const getAboutUsFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateAboutUs = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateAboutUsSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateAboutUsFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getCustomerEXP = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getCustomerEXPSuccess = (state, action) => {
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCustomer: data,
  });
};

const getCustomerEXPFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCustomerEXP = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateCustomerEXPSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCustomerEXPFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataMap = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataMapSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataMapFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_ABOUT_US]: getAboutUs,
  [Types.GET_ABOUT_US_SUCCESS]: getAboutUsSuccess,
  [Types.GET_ABOUT_US_FAILED]: getAboutUsFailed,

  [Types.UPDATE_ABOUT_US]: updateAboutUs,
  [Types.UPDATE_ABOUT_US_SUCCESS]: updateAboutUsSuccess,
  [Types.UPDATE_ABOUT_US_FAILED]: updateAboutUsFailed,

  [Types.GET_CUSTOMER_EXP]: getCustomerEXP,
  [Types.GET_CUSTOMER_EXP_SUCCESS]: getCustomerEXPSuccess,
  [Types.GET_CUSTOMER_EXP_FAILED]: getCustomerEXPFailed,

  [Types.UPDATE_CUSTOMER_EXP]: updateCustomerEXP,
  [Types.UPDATE_CUSTOMER_EXP_SUCCESS]: updateCustomerEXPSuccess,
  [Types.UPDATE_CUSTOMER_EXP_FAILED]: updateCustomerEXPFailed,

  [Types.GET_DATA_MAP]: getDataMap,
  [Types.GET_DATA_MAP_SUCCESS]: getDataMapSuccess,
  [Types.GET_DATA_MAP_FAILED]: getDataMapFailed,
};

// Create reducers by pass state and handlers
export const displayReducer = createReducer(INITIAL_STATE, HANDLERS);
