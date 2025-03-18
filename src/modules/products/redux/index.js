import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  productList: [],
};

const mainSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getDataProducts: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    getDataProductsSuccess: (state, action) => {
      const { products } = action?.data
      return {
        ...state,
        type: action.type,
        isProcessing: false,
        productList: products?.data,
        totalProduct: products?.total,
        currentPage: products?.current_page,
        per_page: products?.per_page
      };
    },

    getDataProductsFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
    deleteProducts: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    deleteProductsSuccess: (state, action) => {
      const { products } = action?.data
      return {
        ...state,
        type: action.type,
        isProcessing: false,
      };
    },

    deleteProductsFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
    deleteProductImg: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    deleteProductImgSuccess: (state, action) => {
      return {
        ...state,
        type: action.type,
        isProcessing: false,
      };
    },

    deleteProductImgFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },

    addProduct: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    addProductSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },

    addProductFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
    getProductDetail: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    getProductDetailSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
      state.productDetail = action?.data?.product;
    },

    getProductDetailFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
    updateProduct: (state, action) => {
      state.type = action.type;
      state.isProcessing = true;
    },

    updateProductSuccess: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
      state.productDetail = action?.data?.product;
    },

    updateProductFailed: (state, action) => {
      state.type = action.type;
      state.isProcessing = false;
    },
  },
});

const { actions, reducer } = mainSlice;

export const {
  getDataProducts,
  getDataProductsSuccess,
  getDataProductsFailed,
  deleteProducts,
  deleteProductsSuccess,
  deleteProductsFailed,
  addProduct,
  addProductSuccess,
  addProductFailed,
  getProductDetail,
  getProductDetailSuccess,
  getProductDetailFailed,
  updateProduct,
  updateProductSuccess,
  updateProductFailed,
  deleteProductImg,
  deleteProductImgSuccess,
  deleteProductImgFailed
} = actions;

export default reducer;
