// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

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
  getListPost: ['data'],
  getListPostSuccess: null,
  getListPostFailed: null,
  getListAllCategories: ['data'],
  getListAllCategoriesSuccess: null,
  getListAllCategoriesFailed: null,
  registerPost: ['data'],
  registerPostSuccess: null,
  registerPostFailed: null,
  getListAllSeoTitle: null,
  getListAllSeoTitleSuccess: null,
  getListAllSeoTitleFailed: null,
  deletePost: ['data'],
  deletePostSuccess: null,
  deletePostFailed: null,
  getPostDetail: ['id'],
  getPostDetailSuccess: null,
  getPostDetailFailed: null,
  updatePost: ['id', 'data'],
  updatePostSuccess: null,
  updatePostFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  dataCategories: [],
  dataParent: [],
  categoriesDetail: {},
  listPost: [],
  totalPost: '',
  listAllCategories: [],
  listAllSeoTitle: [],
  errorMsg: '',
  dataPostDetail: {},
  listCategoryPost: {},
});

const getListCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListCategoriesSuccess = (state, action) => {
  const dataListCategory =
    action.data.categories &&
    action.data.categories.data &&
    action.data.categories.data.map((item) => ({
      id: item.id,
      title: item.name,
      category: item.slug,
      score: item.posts_count,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCategories: dataListCategory,
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
  const listParent =
    action.data &&
    action.data.categories &&
    action.data.categories.map((item) => ({
      id: item.id,
      value: item.name,
      label: item.name,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataParent: listParent,
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

const getListPost = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPostSuccess = (state, action) => {
  const dataListPost =
    action.data.post &&
    action.data.post.data.map((item) => ({
      id: item.id,
      title: item.seo_title,
      writer: item.user.name,
      category: item.category.name,
      time: moment(item.created_at).format('HH:mm YYYY-MM-DD'),
      Thumbnail: item.image ? 'Có' : 'Không',
      score: item.seo_score,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listPost: dataListPost,
    totalPost: action.data.post.total,
  });
};

const getListPostFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListAllCategories = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListAllCategoriesSuccess = (state, action) => {
  const dataAllCategories =
    action.data.categories &&
    action.data.categories.data &&
    action.data.categories.data.map((item) => ({
      id: item.id,
      value: item.name,
      label: item.name,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listAllCategories: dataAllCategories,
  });
};

const getListAllCategoriesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPost = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerPostSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerPostFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
  });
};

const getListAllSeoTitle = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListAllSeoTitleSuccess = (state, action) => {
  const dataAllSeoTitle =
    action.data.seo_title &&
    action.data.seo_title.map((item, index) => ({
      id: index,
      value: item,
      label: item,
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listAllSeoTitle: dataAllSeoTitle,
  });
};

const getListAllSeoTitleFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deletePost = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deletePostSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deletePostFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getPostDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getPostDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataPostDetail: action.data.post,
    listCategoryPost: {
      id: action.data.post.category.id,
      value: action.data.post.category.name,
      label: action.data.post.category.name,
    },
  });
};

const getPostDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePost = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePostSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePostFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorMsg: action.errorMsg,
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

  [Types.GET_LIST_POST]: getListPost,
  [Types.GET_LIST_POST_SUCCESS]: getListPostSuccess,
  [Types.GET_LIST_POST_FAILED]: getListPostFailed,

  [Types.GET_LIST_ALL_CATEGORIES]: getListAllCategories,
  [Types.GET_LIST_ALL_CATEGORIES_SUCCESS]: getListAllCategoriesSuccess,
  [Types.GET_LIST_ALL_CATEGORIES_FAILED]: getListAllCategoriesFailed,

  [Types.REGISTER_POST]: registerPost,
  [Types.REGISTER_POST_SUCCESS]: registerPostSuccess,
  [Types.REGISTER_POST_FAILED]: registerPostFailed,

  [Types.GET_LIST_ALL_SEO_TITLE]: getListAllSeoTitle,
  [Types.GET_LIST_ALL_SEO_TITLE_SUCCESS]: getListAllSeoTitleSuccess,
  [Types.GET_LIST_ALL_SEO_TITLE_FAILED]: getListAllSeoTitleFailed,

  [Types.DELETE_POST]: deletePost,
  [Types.DELETE_POST_SUCCESS]: deletePostSuccess,
  [Types.DELETE_POST_FAILED]: deletePostFailed,

  [Types.GET_POST_DETAIL]: getPostDetail,
  [Types.GET_POST_DETAIL_SUCCESS]: getPostDetailSuccess,
  [Types.GET_POST_DETAIL_FAILED]: getPostDetailFailed,

  [Types.UPDATE_POST]: updatePost,
  [Types.UPDATE_POST_SUCCESS]: updatePostSuccess,
  [Types.UPDATE_POST_FAILED]: updatePostFailed,
};

// Create reducers by pass state and handlers
export const postReducer = createReducer(INITIAL_STATE, HANDLERS);
