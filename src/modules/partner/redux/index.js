// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

// Define action creators
export const { Types, Creators } = createActions({
  getListPartner: ['data'],
  getListPartnerSuccess: null,
  getListPartnerFailed: null,
  getListAreas: null,
  getListAreasSuccess: null,
  getListAreasFailed: null,
  getListConstant: ['data'],
  getListConstantSuccess: null,
  getListConstantFailed: null,
  getListPartnerManagement: ['id'],
  getListPartnerManagementSuccess: null,
  getListPartnerManagementFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataPartner: [],
  dataAreas: [],
  dataConstant: [],
  totalPartner: '',
  dataQuotes: [],
  dataConstructions: [],
  dataProducts: [],
  dataPartnerManagement: {},
  totalPartnerManagement: '',
});

const getListPartner = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPartnerSuccess = (state, action) => {
  const dataPartner = action.data.partner.data.map((item) => ({
    id: item.id,
    name: item.company_name,
    job: item.company_career,
    headquarters: item.company_address,
    vote: item.avg,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataPartner,
    totalPartner: action.data.partner.total,
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

const getListConstant = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListConstantSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataConstant:
      action.data.data &&
      action.data.data.constant &&
      action.data.data.constant.split(',').map((item, index) => {
        return { id: index, value: item, label: item };
      }),
  });
};

const getListConstantFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListPartnerManagement = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPartnerManagementSuccess = (state, action) => {
  const dataQuotes = action.data.partner.quotes.map((item) => ({
    id: item.id,
    date:
      item.created_at && moment(item.created_at).format('HH:MM - DD/MM/YYYY'),
    name: item.project.partner.name,
    hashtag: `#sofa`,
    headquarters: item.project.address,
  }));
  const dataProducts = action.data.partner.products.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
  const dataConstructions = action.data.partner.constructions.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataQuotes,
    dataProducts,
    dataConstructions,
    dataPartnerManagement: action.data.partner,
    totalPartnerManagement: action.data.partner.total,
  });
};

const getListPartnerManagementFailed = (state, action) => {
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

  [Types.GET_LIST_CONSTANT]: getListConstant,
  [Types.GET_LIST_CONSTANT_SUCCESS]: getListConstantSuccess,
  [Types.GET_LIST_CONSTANT_FAILED]: getListConstantFailed,

  [Types.GET_LIST_PARTNER_MANAGEMENT]: getListPartnerManagement,
  [Types.GET_LIST_PARTNER_MANAGEMENT_SUCCESS]: getListPartnerManagementSuccess,
  [Types.GET_LIST_PARTNER_MANAGEMENT_FAILED]: getListPartnerManagementFailed,
};

// Create reducers by pass state and handlers
export const partnerReducer = createReducer(INITIAL_STATE, HANDLERS);
