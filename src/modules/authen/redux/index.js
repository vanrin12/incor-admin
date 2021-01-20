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
});

// Initial state
export const INITIAL_STATE = Immutable({
  userInfo: {},
  isProcessing: false,
  errors: '',
  type: '',
  token: '',
  accountInfo: {},
  getInfoUser: {},
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

// Assign handler to types.
const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILED]: signInFailed,
  [Types.LOG_OUT]: logOut,
  [Types.LOG_OUT_SUCCESS]: logOutSuccess,
  [Types.LOG_OUT_FAILED]: logOutFailed,
  [Types.GET_LIST_USER]: getListUser,
};

// Create reducers by pass state and handlers
export const authReducer = createReducer(INITIAL_STATE, HANDLERS);
