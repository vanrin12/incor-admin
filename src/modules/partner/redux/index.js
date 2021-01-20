// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListPartner: ['data'],
  getListPartnerSuccess: null,
  getListPartnerFailed: null,
  getListAreas: null,
  getListAreasSuccess: null,
  getListAreasFailed: null,
  getListScales: null,
  getListScalesSuccess: null,
  getListScalesFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataPartner: [],
  dataAreas: [],
  dataScales: [],
});

const getListPartner = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPartnerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataPartner: action.data.partner,
  });
};

const getListPartnerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListAreas = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListAreasSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAreas:
      action.data.data &&
      action.data.data.areas &&
      action.data.data.areas.map((item) => {
        return { id: item.id, value: item.name, label: item.name };
      }),
  });
};

const getListAreasFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListScales = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListScalesSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataScales:
      action.data.data &&
      action.data.data.areas &&
      action.data.data.areas.map((item) => {
        return { id: item.id, value: item.name, label: item.name };
      }),
  });
};

const getListScalesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_PARTNER]: getListPartner,
  [Types.GET_LIST_PARTNER_SUCCESS]: getListPartnerSuccess,
  [Types.GET_LIST_PARTNER_FAILED]: getListPartnerFailed,

  [Types.GET_LIST_AREAS]: getListAreas,
  [Types.GET_LIST_AREAS_SUCCESS]: getListAreasSuccess,
  [Types.GET_LIST_AREAS_FAILED]: getListAreasFailed,

  [Types.GET_LIST_SCALES]: getListScales,
  [Types.GET_LIST_SCALES_SUCCESS]: getListScalesSuccess,
  [Types.GET_LIST_SCALES_FAILED]: getListScalesFailed,
};

// Create reducers by pass state and handlers
export const partnerReducer = createReducer(INITIAL_STATE, HANDLERS);
