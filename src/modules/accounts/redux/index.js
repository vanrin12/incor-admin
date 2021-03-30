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

    createUser: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    createUserSuccess: (state, action) => {
      const { data, userList } = action;
      state.type = action.type;
      state.isProcessing = false;
      state.userList = {
        ...userList,
        data: [
          {
            id: data?.user?.id,
            name: data?.user?.name,
            role_name: data?.user?.roles?.[0]?.name,
            create_at: data?.user?.created_at,
          },
          ...userList.data,
        ],
      };
    },

    createUserFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },

    deleteUser: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    deleteUserSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },

    deleteUserFailed: (state, action) => {
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
  getUserRolesFailed,
  createUser,
  createUserFailed,
  createUserSuccess,
  deleteUser,
  deleteUserFailed,
  deleteUserSuccess,
} = actions;

export default reducer;
