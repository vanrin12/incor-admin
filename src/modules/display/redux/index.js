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

  createIntroduce: ['data'],
  createIntroduceSuccess: null,
  createIntroduceFailed: null,

  getValueHeader: ['data'],
  getValueHeaderSuccess: null,
  getValueHeaderFailed: null,

  createFooter: ['data'],
  createFooterSuccess: null,
  createFooterFailed: null,

  getDataFooter: null,
  getDataFooterSuccess: null,
  getDataFooterFailed: null,

  updateSaleMap: ['data'],
  updateSaleMapSuccess: null,
  updateSaleMapFailed: null,

  getListSlider: null,
  getListSliderSuccess: null,
  getListSliderFailed: null,

  deleteSlider: ['id'],
  deleteSliderSuccess: null,
  deleteSliderFailed: null,

  updateListSlider: ['data'],
  updateListSliderSuccess: null,
  updateListSliderFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  statusCode: 0,
  dataAboutUs: {},
  dataCustomer: {},
  dataSaleMap: {},
  errors: '',
  type: '',
  valueHeader: [],
  dataFooter: {},
  dataListSlider: {},
  titleSlider: '',
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
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSaleMap: data,
  });
};

const getDataMapFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateSaleMap = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateSaleMapSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateSaleMapFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};
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
    errors: action?.errors,
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
    valueHeader: action?.data?.map,
  });
};

const getValueHeaderFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action?.errors,
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

const getDataFooter = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};
const getDataFooterSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataFooter: action?.data?.constant,
  });
};

const getDataFooterFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors,
  });
};

const getListSlider = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListSliderSuccess = (state, action) => {
  const { data } = action;
  const dataListSlider =
    data &&
    data.uploads.map((item) => ({
      id: item.id,
      image: '',
      name: '',
      imageView: item.image,
    }));

  return state.merge({
    isProcessing: false,
    type: action.type,
    dataListSlider,
    titleSlider: data && data?.title,
  });
};

const getListSliderFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteSlider = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteSliderSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteSliderFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateListSlider = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateListSliderSuccess = (state, action) => {
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    statusCode: data?.code,
  });
};

const updateListSliderFailed = (state, action) => {
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

  [Types.UPDATE_SALE_MAP]: updateSaleMap,
  [Types.UPDATE_SALE_MAP_SUCCESS]: updateSaleMapSuccess,
  [Types.UPDATE_SALE_MAP_FAILED]: updateSaleMapFailed,

  [Types.CREATE_INTRODUCE]: createIntroduce,
  [Types.CREATE_INTRODUCE_SUCCESS]: createIntroduceSuccess,
  [Types.CREATE_INTRODUCE_FAILED]: createIntroduceFailed,

  [Types.GET_VALUE_HEADER]: getValueHeader,
  [Types.GET_VALUE_HEADER_SUCCESS]: getValueHeaderSuccess,
  [Types.GET_VALUE_HEADER_FAILED]: getValueHeaderFailed,

  [Types.CREATE_FOOTER]: createFooter,
  [Types.CREATE_FOOTER_SUCCESS]: createFooterSuccess,
  [Types.CREATE_FOOTER_FAILED]: createFooterFailed,

  [Types.GET_DATA_FOOTER]: getDataFooter,
  [Types.GET_DATA_FOOTER_SUCCESS]: getDataFooterSuccess,
  [Types.GET_DATA_FOOTER_FAILED]: getDataFooterFailed,

  [Types.GET_LIST_SLIDER]: getListSlider,
  [Types.GET_LIST_SLIDER_SUCCESS]: getListSliderSuccess,
  [Types.GET_LIST_SLIDER_FAILED]: getListSliderFailed,

  [Types.DELETE_SLIDER]: deleteSlider,
  [Types.DELETE_SLIDER_SUCCESS]: deleteSliderSuccess,
  [Types.DELETE_SLIDER_FAILED]: deleteSliderFailed,

  [Types.UPDATE_LIST_SLIDER]: updateListSlider,
  [Types.UPDATE_LIST_SLIDER_SUCCESS]: updateListSliderSuccess,
  [Types.UPDATE_LIST_SLIDER_FAILED]: updateListSliderFailed,
};

// Create reducers by pass state and handlers
export const displayReducer = createReducer(INITIAL_STATE, HANDLERS);
