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
  getDetailProject: ['id', 'data'],
  getDetailProjectSuccess: null,
  getDetailProjectFailed: null,
  getListProject: null,
  getListProjectSuccess: null,
  getListProjectFailed: null,
  getListConstructionCustomer: ['id', 'data'],
  getListConstructionCustomerSuccess: null,
  getListConstructionCustomerFailed: null,
  registerConstructionCustomer: ['data'],
  registerConstructionCustomerSuccess: null,
  registerConstructionCustomerFailed: null,
  registerProjectItem: ['data'],
  registerProjectItemSuccess: null,
  registerProjectItemFailed: null,
  resetData: null,
  updateProjectItem: ['id', 'data'],
  updateProjectItemSuccess: null,
  updateProjectItemFailed: null,

  deleteProjectItem: ['id'],
  deleteProjectItemSuccess: null,
  deleteProjectItemFailed: null,
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
  listConstructionCustomer: {},
  listTableConstruction: [],
  totalConstruction: 0,
  projectId: '',
  tableDetailProject: [],
});

const getListCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListCustomerSuccess = (state, action) => {
  const listDataCustomer = action?.data?.customer?.data || [];
  const dataCustomer = listDataCustomer.map((item) => ({
    id: item.id,
    date:
      item.created_at && moment(item.created_at).format('HH:mm - DD/MM/yyyy'),
    nameUser: item.full_name,
    nameCustomer: item.name,
    nameIncor: item.name_incor,
    vote: item.area?.name,
  }));

  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCustomer,
    totalCustomer: action?.data?.customer?.total,
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
  const listDivision = action.data.division.map((item) => ({
    id: item.id,
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
    projectId: action?.data?.customer?.id,
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
    tableDetailProject:
      action &&
      action.data &&
      action.data.project &&
      action.data.project.items &&
      action.data.project.items.data &&
      action.data.project.items.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          amount: item.amount,
          unit: item.unit,
          note: item.note,
        };
      }),
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

const deleteProjectItem = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteProjectItemSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteProjectItemFailed = (state, action) => {
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

const getListConstructionCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListConstructionCustomerSuccess = (state, action) => {
  const listTableConstruction =
    action.data &&
    action.data[0] &&
    action.data[0].item &&
    action.data[0].item.data.map((item) => ({
      id: item.id,
      categories: item.category,
      description: item.description,
      total: item.amount,
      time: `${item.estimate} ${item.unit}`,
      progress: `${item.progress_begin} / ${item.progress_end}`,
      price: item.paid,
      prices: item.amount - item.paid,
      note: item.note,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listConstructionCustomer: action.data && action.data[0],
    listTableConstruction,
    totalConstruction: action?.data[0]?.item?.total,
  });
};

const getListConstructionCustomerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerConstructionCustomer = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerConstructionCustomerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerConstructionCustomerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerProjectItem = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerProjectItemSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerProjectItemFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateProjectItem = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateProjectItemSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateProjectItemFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetData = (state) => {
  return state.merge({
    projectId: '',
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

  [Types.GET_LIST_CONSTRUCTION_CUSTOMER]: getListConstructionCustomer,
  [Types.GET_LIST_CONSTRUCTION_CUSTOMER_SUCCESS]: getListConstructionCustomerSuccess,
  [Types.GET_LIST_CONSTRUCTION_CUSTOMER_FAILED]: getListConstructionCustomerFailed,

  [Types.REGISTER_CONSTRUCTION_CUSTOMER]: registerConstructionCustomer,
  [Types.REGISTER_CONSTRUCTION_CUSTOMER_SUCCESS]: registerConstructionCustomerSuccess,
  [Types.REGISTER_CONSTRUCTION_CUSTOMER_FAILED]: registerConstructionCustomerFailed,

  [Types.REGISTER_PROJECT_ITEM]: registerProjectItem,
  [Types.REGISTER_PROJECT_ITEM_SUCCESS]: registerProjectItemSuccess,
  [Types.REGISTER_PROJECT_ITEM_FAILED]: registerProjectItemFailed,

  [Types.UPDATE_PROJECT_ITEM]: updateProjectItem,
  [Types.UPDATE_PROJECT_ITEM_SUCCESS]: updateProjectItemSuccess,
  [Types.UPDATE_PROJECT_ITEM_FAILED]: updateProjectItemFailed,

  [Types.DELETE_PROJECT_ITEM]: deleteProjectItem,
  [Types.DELETE_PROJECT_ITEM_SUCCESS]: deleteProjectItemSuccess,
  [Types.DELETE_PROJECT_ITEM_FAILED]: deleteProjectItemFailed,

  [Types.RESET_DATA]: resetData,
};

// Create reducers by pass state and handlers
export const customerReducer = createReducer(INITIAL_STATE, HANDLERS);
