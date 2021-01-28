// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListCustomer: ['data'],
  getListCustomerSuccess: null,
  getListCustomerFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCustomer: [],
  totalCustomer: '',
});

const getListCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListCustomerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCustomer: action.data.customer,
    totalCustomer: action.data.customer.total,
  });
};

const getListCustomerFailed = (state, action) => {
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
};

// Create reducers by pass state and handlers
export const customerReducer = createReducer(INITIAL_STATE, HANDLERS);
