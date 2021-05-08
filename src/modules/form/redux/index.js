// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

// Define action creators
export const { Types, Creators } = createActions({
  getFormRequest: ['data'],
  getFormRequestSuccess: null,
  getFormRequestFailed: null,
  deleteFormRequest: ['data'],
  deleteFormRequestSuccess: null,
  deleteFormRequestFailed: null,
  resetType: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataFormRequest: [],
  totalRequest: '',
});

const getFormRequest = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getFormRequestSuccess = (state, action) => {
  const dataFormRequest = action?.data?.form_request?.data.map((item) => ({
    id: item.id,
    startDate: moment(item.created_at).format('HH:mm YYYY-MM-DD'),
    name: item.name,
    phone: item.phone,
    email: item.email,
    address: item?.area?.name,
    space: item?.space_type?.name,
    space_division: item?.space_division?.name,
    file: item.file,
    date: `${item.time} - ${item.date}`,
    description: item.description,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataFormRequest,
    totalRequest: action?.data?.form_request?.total,
  });
};

const getFormRequestFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteFormRequest = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteFormRequestSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteFormRequestFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_FORM_REQUEST]: getFormRequest,
  [Types.GET_FORM_REQUEST_SUCCESS]: getFormRequestSuccess,
  [Types.GET_FORM_REQUEST_FAILED]: getFormRequestFailed,

  [Types.DELETE_FORM_REQUEST]: deleteFormRequest,
  [Types.DELETE_FORM_REQUEST_SUCCESS]: deleteFormRequestSuccess,
  [Types.DELETE_FORM_REQUEST_FAILED]: deleteFormRequestFailed,
};

// Create reducers by pass state and handlers
export const formReducer = createReducer(INITIAL_STATE, HANDLERS);
