// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListCategories: ['data'],
  getListCategoriesSuccess: null,
  getListCategoriesFailed: null,
  deleteCategories: ['data'],
  deleteCategoriesSuccess: null,
  deleteCategoriesFailed: null,
  registerCategories: ['data'],
  registerCategoriesSuccess: null,
  registerCategoriesFailed: null,
  getListParent: null,
  getListParentSuccess: null,
  getListParentFailed: null,
  getCategoriesDetail: ['id'],
  getCategoriesDetailSuccess: null,
  getCategoriesDetailFailed: null,
  updateCategories: ['id', 'data'],
  updateCategoriesSuccess: null,
  updateCategoriesFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCategories: [],
  dataParent: [],
  categoriesDetail: {},
});

const getListCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListCategoriesSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCategories:
      action.data.categories &&
      action.data.categories.data &&
      action.data.categories.data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          category: item.slug,
          score: item.posts_count,
        };
      }),
  });
};

const getListCategoriesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteCategoriesSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteCategoriesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerCategoriesSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerCategoriesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListParent = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListParentSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataParent:
      action.data &&
      action.data.categories &&
      action.data.categories.map((item) => {
        return { id: item.id, value: item.name, label: item.name };
      }),
  });
};

const getListParentFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getCategoriesDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getCategoriesDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    categoriesDetail: action.data.category,
  });
};

const getCategoriesDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateCategoriesSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateCategoriesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_CATEGORIES]: getListCategories,
  [Types.GET_LIST_CATEGORIES_SUCCESS]: getListCategoriesSuccess,
  [Types.GET_LIST_CATEGORIES_FAILED]: getListCategoriesFailed,

  [Types.DELETE_CATEGORIES]: deleteCategories,
  [Types.DELETE_CATEGORIES_SUCCESS]: deleteCategoriesSuccess,
  [Types.DELETE_CATEGORIES_FAILED]: deleteCategoriesFailed,

  [Types.REGISTER_CATEGORIES]: registerCategories,
  [Types.REGISTER_CATEGORIES_SUCCESS]: registerCategoriesSuccess,
  [Types.REGISTER_CATEGORIES_FAILED]: registerCategoriesFailed,

  [Types.GET_LIST_PARENT]: getListParent,
  [Types.GET_LIST_PARENT_SUCCESS]: getListParentSuccess,
  [Types.GET_LIST_PARENT_FAILED]: getListParentFailed,

  [Types.GET_CATEGORIES_DETAIL]: getCategoriesDetail,
  [Types.GET_CATEGORIES_DETAIL_SUCCESS]: getCategoriesDetailSuccess,
  [Types.GET_CATEGORIES_DETAIL_FAILED]: getCategoriesDetailFailed,

  [Types.UPDATE_CATEGORIES]: updateCategories,
  [Types.UPDATE_CATEGORIES_SUCCESS]: updateCategoriesSuccess,
  [Types.UPDATE_CATEGORIES_FAILED]: updateCategoriesFailed,
};

// Create reducers by pass state and handlers
export const postReducer = createReducer(INITIAL_STATE, HANDLERS);
