import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProductData: {
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    // getProductList
    getProductListRequest: (state) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.productList.data = more
        ? [...state.productList.data, ...data]
        : data;
      state.productList.meta = meta;
      state.productList.loading = false;
    },
    getProductListFail: (state, action) => {
      const { error } = action.payload;
      state.productList.error = error;
      state.productList.loading = false;
    },

    // getProductDetail
    getProductDetailRequest: (state) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.data = data;
      state.productDetail.loading = false;
    },
    getProductDetailFail: (state, action) => {
      const { error } = action.payload;
      state.productDetail.error = error;
      state.productDetail.loading = false;
    },

    createProduct: (state, action) => {
      state.productList.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    updateProduct: () => {
      // do something
    },
    deleteProduct: () => {
      // do something
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
  createProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
