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
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCustomer: [],
  listName: [],
  totalCustomer: '',
  dataDetailCustomer: {},
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
};

// Create reducers by pass state and handlers
export const customerReducer = createReducer(INITIAL_STATE, HANDLERS);
