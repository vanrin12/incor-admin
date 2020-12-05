import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isProcessing: false,
  type: '',
  token: '',
  checkEmailResponse: {},
  point: '',
  loginCount: '',
  errorLogin: '',
  validate: 0,
  statusCode: null,
  errorMessageEmail: '',
  resendEmailResponse: {},
  dateLogin: null,
  findPasswordResponse: {},
  errorSignUp: '',
  dataLogin: {},
  mesgLogedUser: '',
  errorExistEmail: '',
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
});

const { actions, reducer } = accountSlice;

export const {} = actions;

export default reducer;
