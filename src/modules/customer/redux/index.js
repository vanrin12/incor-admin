// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

// Define action creators
export const { Types, Creators } = createActions({
  getListCustomer: ['data'],
  getListCustomerSuccess: null,
  getListCustomerFailed: null,
  getListName: null,
  getListNameSuccess: null,
  getListNameFailed: null,
  getDetailCustomer: ['id'],
  getDetailCustomerSuccess: null,
  getDetailCustomerFailed: null,
  updateCustomer: ['id', 'data'],
  updateCustomerSuccess: null,
  updateCustomerFailed: null,
  getListSpaceType: null,
  getListSpaceTypeSuccess: null,
  getListSpaceTypeFailed: null,
  getListDivision: ['id'],
  getListDivisionSuccess: null,
  getListDivisionFailed: null,
  registerProject: ['data'],
  registerProjectSuccess: null,
  registerProjectFailed: null,
  deleteProject: ['id'],
  deleteProjectSuccess: null,
  deleteProjectFailed: null,
  getDetailProject: ['id'],
  getDetailProjectSuccess: null,
  getDetailProjectFailed: null,
  getListProject: null,
  getListProjectSuccess: null,
  getListProjectFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCustomer: [],
  listName: [],
  totalCustomer: '',
  dataDetailCustomer: {},
  listSpaceType: [],
  listDivision: [],
  dataDetailProject: {},
  listProject: [],
});

const getListCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListCustomerSuccess = (state, action) => {
  const dataCustomer = action.data.customer.data.map((item) => ({
    id: item.id,
    date:
      item.created_at && moment(item.created_at).format('HH:mm - DD/MM/yyyy'),
    nameCustomer: item.name,
    nameIncor: item.name_incor,
    vote: item.area?.name,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCustomer,
    totalCustomer: action.data.customer.total,
  });
};

const getListCustomerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListName = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListNameSuccess = (state, action) => {
  const listName = action.data.name_incor.map((item, index) => ({
    id: index,
    value: item,
    label: item,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listName,
  });
};

const getListNameFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDetailCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailCustomerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailCustomer: action.data.customer,
  });
};

const getDetailCustomerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateCustomerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCustomerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListSpaceType = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListSpaceTypeSuccess = (state, action) => {
  const listSpaceType = action.data.type.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listSpaceType,
  });
};

const getListSpaceTypeFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListDivision = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListDivisionSuccess = (state, action) => {
  const listDivision = action.data.division.map((item, index) => ({
    id: index,
    value: item.name,
    label: item.name,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listDivision,
  });
};

const getListDivisionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerProject = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerProjectSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerProjectFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDetailProject = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailProjectSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailProject: action.data.project,
  });
};

const getDetailProjectFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteProject = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteProjectSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteProjectFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListProject = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListProjectSuccess = (state, action) => {
  const listProject = action.data.project.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listProject,
  });
};

const getListProjectFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_CUSTOMER]: getListCustomer,
  [Types.GET_LIST_CUSTOMER_SUCCESS]: getListCustomerSuccess,
  [Types.GET_LIST_CUSTOMER_FAILED]: getListCustomerFailed,

  [Types.GET_LIST_NAME]: getListName,
  [Types.GET_LIST_NAME_SUCCESS]: getListNameSuccess,
  [Types.GET_LIST_NAME_FAILED]: getListNameFailed,

  [Types.GET_DETAIL_CUSTOMER]: getDetailCustomer,
  [Types.GET_DETAIL_CUSTOMER_SUCCESS]: getDetailCustomerSuccess,
  [Types.GET_DETAIL_CUSTOMER_FAILED]: getDetailCustomerFailed,

  [Types.UPDATE_CUSTOMER]: updateCustomer,
  [Types.UPDATE_CUSTOMER_SUCCESS]: updateCustomerSuccess,
  [Types.UPDATE_CUSTOMER_FAILED]: updateCustomerFailed,

  [Types.GET_LIST_SPACE_TYPE]: getListSpaceType,
  [Types.GET_LIST_SPACE_TYPE_SUCCESS]: getListSpaceTypeSuccess,
  [Types.GET_LIST_SPACE_TYPE_FAILED]: getListSpaceTypeFailed,

  [Types.GET_LIST_DIVISION]: getListDivision,
  [Types.GET_LIST_DIVISION_SUCCESS]: getListDivisionSuccess,
  [Types.GET_LIST_DIVISION_FAILED]: getListDivisionFailed,

  [Types.REGISTER_PROJECT]: registerProject,
  [Types.REGISTER_PROJECT_SUCCESS]: registerProjectSuccess,
  [Types.REGISTER_PROJECT_FAILED]: registerProjectFailed,

  [Types.DELETE_PROJECT]: deleteProject,
  [Types.DELETE_PROJECT_SUCCESS]: deleteProjectSuccess,
  [Types.DELETE_PROJECT_FAILED]: deleteProjectFailed,

  [Types.GET_DETAIL_PROJECT]: getDetailProject,
  [Types.GET_DETAIL_PROJECT_SUCCESS]: getDetailProjectSuccess,
  [Types.GET_DETAIL_PROJECT_FAILED]: getDetailProjectFailed,

  [Types.GET_LIST_PROJECT]: getListProject,
  [Types.GET_LIST_PROJECT_SUCCESS]: getListProjectSuccess,
  [Types.GET_LIST_PROJECT_FAILED]: getListProjectFailed,
};

// Create reducers by pass state and handlers
export const customerReducer = createReducer(INITIAL_STATE, HANDLERS);
