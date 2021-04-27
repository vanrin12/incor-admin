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
  getListScales: null,
  getListScalesSuccess: null,
  getListScalesFailed: null,
  getListConstant: ['data'],
  getListConstantSuccess: null,
  getListConstantFailed: null,
  getListPartnerManagement: ['id'],
  getListPartnerManagementSuccess: null,
  getListPartnerManagementFailed: null,
  deletePartner: ['data'],
  deletePartnerSuccess: null,
  deletePartnerFailed: null,
  registerPartnerCompany: ['data'],
  registerPartnerCompanySuccess: null,
  registerPartnerCompanyFailed: null,
  getListConstruction: ['data'],
  getListConstructionSuccess: null,
  getListConstructionFailed: null,
  getListPartnerProduct: ['data'],
  getListPartnerProductSuccess: null,
  getListPartnerProductFailed: null,
  getListPartnerQuote: ['id', 'data'],
  getListPartnerQuoteSuccess: null,
  getListPartnerQuoteFailed: null,
  registerPartnerProduct: ['data'],
  registerPartnerProductSuccess: null,
  registerPartnerProductFailed: null,
  registerPartnerConstruction: ['data'],
  registerPartnerConstructionSuccess: null,
  registerPartnerConstructionFailed: null,
  getDetailPartnerProduct: ['id'],
  getDetailPartnerProductSuccess: null,
  getDetailPartnerProductFailed: null,
  updatePartnerProduct: ['id', 'data'],
  updatePartnerProductSuccess: null,
  updatePartnerProductFailed: null,
  getDetailPartnerConstruction: ['id'],
  getDetailPartnerConstructionSuccess: null,
  getDetailPartnerConstructionFailed: null,
  updatePartnerConstruction: ['id', 'data'],
  updatePartnerConstructionSuccess: null,
  updatePartnerConstructionFailed: null,
  resetType: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataPartner: [],
  dataAreas: [],
  dataConstant: [],
  dataScales: [],
  totalPartner: '',
  dataQuotes: [],
  dataConstructions: [],
  dataProducts: [],
  dataPartnerManagement: {},
  dataDetailPartnerProduct: {},
  dataDetailPartnerConstruction: {},
  totalPartnerManagement: '',
  totalQuotes: '',
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
    name: item.partner_name,
    nameUser: item.full_name,
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
  const defaultData = {
    id: 0,
    value: 'Tất cả',
    label: 'Tất cả',
  };
  const dataAreas =
    action.data.data &&
    action.data.data.areas &&
    action.data.data.areas.map((item) => {
      return { id: item.id, value: item.name, label: item.name };
    });
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAreas: [defaultData, ...dataAreas],
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
  const dataScales =
    action.data.data &&
    action.data.data.areas &&
    action.data.data.areas.map((item) => {
      return { id: item.id, value: item.name, label: item.name };
    });
  const defaultOption = { id: 0, value: '', label: 'Bỏ chọn' };
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataScales: [defaultOption, ...dataScales],
  });
};

const getListScalesFailed = (state, action) => {
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
  return state.merge({
    isProcessing: false,
    type: action.type,
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

const deletePartner = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deletePartnerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deletePartnerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPartnerCompany = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerPartnerCompanySuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPartnerCompanyFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const getListConstruction = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListConstructionSuccess = (state, action) => {
  const dataConstructions = action.data.product;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataConstructions,
  });
};

const getListConstructionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListPartnerProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPartnerProductSuccess = (state, action) => {
  const dataProducts = action.data.product;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataProducts,
  });
};

const getListPartnerProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListPartnerQuote = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPartnerQuoteSuccess = (state, action) => {
  const dataQuotes = action.data.quotes.data.map((item) => {
    return {
      id: item.id,
      date:
        item.created_at && moment(item.created_at).format('HH:SS MM/DD/YYYY'),
      nameCustomer: item.customer?.name,
      tag: `#${item?.project?.space_division?.name}`,
      dvt: item.project?.address,
    };
  });
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataQuotes,
    totalQuotes: action.data.quotes.total,
  });
};

const getListPartnerQuoteFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPartnerProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerPartnerProductSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPartnerProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const registerPartnerConstruction = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerPartnerConstructionSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPartnerConstructionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const getDetailPartnerProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailPartnerProductSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailPartnerProduct: action.data.product,
  });
};

const getDetailPartnerProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const updatePartnerProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePartnerProductSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePartnerProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const getDetailPartnerConstruction = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailPartnerConstructionSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailPartnerConstruction: action.data.construction,
  });
};

const getDetailPartnerConstructionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const updatePartnerConstruction = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePartnerConstructionSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePartnerConstructionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const resetType = (state) => {
  return state.merge({
    type: '',
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

  [Types.GET_LIST_CONSTANT]: getListConstant,
  [Types.GET_LIST_CONSTANT_SUCCESS]: getListConstantSuccess,
  [Types.GET_LIST_CONSTANT_FAILED]: getListConstantFailed,

  [Types.GET_LIST_PARTNER_MANAGEMENT]: getListPartnerManagement,
  [Types.GET_LIST_PARTNER_MANAGEMENT_SUCCESS]: getListPartnerManagementSuccess,
  [Types.GET_LIST_PARTNER_MANAGEMENT_FAILED]: getListPartnerManagementFailed,

  [Types.DELETE_PARTNER]: deletePartner,
  [Types.DELETE_PARTNER_SUCCESS]: deletePartnerSuccess,
  [Types.DELETE_PARTNER_FAILED]: deletePartnerFailed,

  [Types.REGISTER_PARTNER_COMPANY]: registerPartnerCompany,
  [Types.REGISTER_PARTNER_COMPANY_SUCCESS]: registerPartnerCompanySuccess,
  [Types.REGISTER_PARTNER_COMPANY_FAILED]: registerPartnerCompanyFailed,

  [Types.GET_LIST_CONSTRUCTION]: getListConstruction,
  [Types.GET_LIST_CONSTRUCTION_SUCCESS]: getListConstructionSuccess,
  [Types.GET_LIST_CONSTRUCTION_FAILED]: getListConstructionFailed,

  [Types.GET_LIST_PARTNER_PRODUCT]: getListPartnerProduct,
  [Types.GET_LIST_PARTNER_PRODUCT_SUCCESS]: getListPartnerProductSuccess,
  [Types.GET_LIST_PARTNER_PRODUCT_FAILED]: getListPartnerProductFailed,

  [Types.GET_LIST_PARTNER_QUOTE]: getListPartnerQuote,
  [Types.GET_LIST_PARTNER_QUOTE_SUCCESS]: getListPartnerQuoteSuccess,
  [Types.GET_LIST_PARTNER_QUOTE_FAILED]: getListPartnerQuoteFailed,

  [Types.REGISTER_PARTNER_PRODUCT]: registerPartnerProduct,
  [Types.REGISTER_PARTNER_PRODUCT_SUCCESS]: registerPartnerProductSuccess,
  [Types.REGISTER_PARTNER_PRODUCT_FAILED]: registerPartnerProductFailed,

  [Types.REGISTER_PARTNER_CONSTRUCTION]: registerPartnerConstruction,
  [Types.REGISTER_PARTNER_CONSTRUCTION_SUCCESS]: registerPartnerConstructionSuccess,
  [Types.REGISTER_PARTNER_CONSTRUCTION_FAILED]: registerPartnerConstructionFailed,

  [Types.GET_DETAIL_PARTNER_PRODUCT]: getDetailPartnerProduct,
  [Types.GET_DETAIL_PARTNER_PRODUCT_SUCCESS]: getDetailPartnerProductSuccess,
  [Types.GET_DETAIL_PARTNER_PRODUCT_FAILED]: getDetailPartnerProductFailed,

  [Types.UPDATE_PARTNER_PRODUCT]: updatePartnerProduct,
  [Types.UPDATE_PARTNER_PRODUCT_SUCCESS]: updatePartnerProductSuccess,
  [Types.UPDATE_PARTNER_PRODUCT_FAILED]: updatePartnerProductFailed,

  [Types.GET_DETAIL_PARTNER_CONSTRUCTION]: getDetailPartnerConstruction,
  [Types.GET_DETAIL_PARTNER_CONSTRUCTION_SUCCESS]: getDetailPartnerConstructionSuccess,
  [Types.GET_DETAIL_PARTNER_CONSTRUCTION_FAILED]: getDetailPartnerConstructionFailed,

  [Types.UPDATE_PARTNER_CONSTRUCTION]: updatePartnerConstruction,
  [Types.UPDATE_PARTNER_CONSTRUCTION_SUCCESS]: updatePartnerConstructionSuccess,
  [Types.UPDATE_PARTNER_CONSTRUCTION_FAILED]: updatePartnerConstructionFailed,

  [Types.RESET_TYPE]: resetType,
};

// Create reducers by pass state and handlers
export const partnerReducer = createReducer(INITIAL_STATE, HANDLERS);
