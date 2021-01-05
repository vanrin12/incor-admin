import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
  isProcessing: false,
  listRoles: [],
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getListUser: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    getListUserSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
      state.userList = action.data.users;
    },

    getListUserFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },

    getUserRoles: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    getUserRolesSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
      state.listRoles = action?.data?.roles.map((item) => ({
        id: item.id,
        value: item.name,
        label: item.name,
      }));
    },

    getUserRolesFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
  },
});

const { actions, reducer } = accountSlice;

export const {
  getListUser,
  getListUserFailed,
  getListUserSuccess,
  getUserRoles,
  getUserRolesSuccess,
  getUserRolesFailedß,
} = actions;

export default reducer;
