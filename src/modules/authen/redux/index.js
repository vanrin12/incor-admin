// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  signIn: ['loginInfo'],
  signInSuccess: null,
  signInFailed: null,
  logOut: null,
  logOutSuccess: null,
  logOutFailed: null,
  getListUser: ['list'],
  resetType: null,

  changePassword: ['data'],
  changePasswordSuccess: null,
  changePasswordFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  userInfo: {},
  isProcessing: false,
  isProcessingPass: false,
  errors: '',
  type: '',
  token: '',
  accountInfo: {},
  getInfoUser: {},
  roleUser: {},
  errorMsg: '',
});

const signIn = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
  });
};

const getListUser = (state, action) => {
  return state.merge({
    getInfoUser:
      action && action.list && action.list.rememberMe ? action.list : {},
  });
};

const signInSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    token: action.data.token,
    accountInfo: action.data.user,
    errors: '',
    roleUser: action.data.user.roles && action.data.user.roles[0],
  });
};

const signInFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors,
  });
};

const logOut = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const logOutSuccess = (state) => {
  return state.merge({
    ...INITIAL_STATE,
    getInfoUser: state.getInfoUser,
  });
};
const logOutFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetType = (state) => {
  return state.merge({
    type: '',
  });
};

const changePassword = (state, action) => {
  return state.merge({
    isProcessingPass: true,
    type: action.type,
  });
};

const changePasswordSuccess = (state, action) => {
  return state.merge({
    isProcessingPass: false,
    type: action.type,
  });
};

const changePasswordFailed = (state, action) => {
  return state.merge({
    isProcessingPass: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILED]: signInFailed,
  [Types.LOG_OUT]: logOut,
  [Types.LOG_OUT_SUCCESS]: logOutSuccess,
  [Types.LOG_OUT_FAILED]: logOutFailed,
  [Types.GET_LIST_USER]: getListUser,
  [Types.RESET_TYPE]: resetType,

  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILED]: changePasswordFailed,
};

// Create reducers by pass state and handlers
export const authReducer = createReducer(INITIAL_STATE, HANDLERS);
