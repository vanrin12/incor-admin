import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  dataMain: {},
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    getDataMain: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    getDataMainSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
      state.dataMain = action.data;
    },

    getDataMainFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
  },
});

const { actions, reducer } = mainSlice;

export const { getDataMain, getDataMainSuccess, getDataMainFailed } = actions;

export default reducer;
