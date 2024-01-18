import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  product2List: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  produc2tDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProduct2Data: {
    loading: false,
    error: null,
  },
};

export const product2Slice = createSlice({
  name: "product2",
  initialState: initialState,
  reducers: {
    // getProduct2List
    getProduct2ListRequest: (state) => {
      state.product2List.loading = true;
      state.product2List.error = null;
    },
    getProduct2ListSuccess: (state, action) => {
      const { data } = action.payload;
      state.product2List.data = data;
      state.product2List.loading = false;
    },
    getProduct2ListFail: (state, action) => {
      const { error } = action.payload;
      state.product2List.error = error;
      state.product2List.loading = false;
    },

    // getProductDetail
    getProduct2DetailRequest: (state) => {
      state.produc2tDetail.loading = true;
      state.product2Detail.error = null;
    },
    getProduct2DetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.product2Detail.data = data;
      state.product2Detail.loading = false;
    },
    getProduct2DetailFail: (state, action) => {
      const { error } = action.payload;
      state.product2Detail.error = error;
      state.product2Detail.loading = false;
    },

    createProduct2: (state, action) => {
      state.product2List.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    updateProduct2: () => {
      // do something
    },
    deleteProduct2: () => {
      // do something
    },
  },
});

export const {
  getProduct2ListRequest,
  getProduct2ListSuccess,
  getProduct2ListFail,
  getProduct2DetailRequest,
  getProduct2DetailSuccess,
  getProduct2DetailFail,
  createProduct2,
  updateProduct2,
  deleteProduct2,
} = product2Slice.actions;

export default product2Slice.reducer;
