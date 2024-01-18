import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category2List: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
};

export const category2Slice = createSlice({
  name: "category2",
  initialState: initialState,
  reducers: {
    // getCategory2List
    getCategory2ListRequest: (state) => {
      state.category2List.loading = true;
      state.category2List.error = null;
    },
    getCategory2ListSuccess: (state, action) => {
      const { data } = action.payload;
      state.category2List.data = data;
      state.category2List.loading = false;
    },
    getCategory2ListFail: (state, action) => {
      const { error } = action.payload;
      state.category2List.error = error;
      state.category2List.loading = false;
    },
  },
});

export const {
  getCategory2ListRequest,
  getCategory2ListSuccess,
  getCategory2ListFail,
} = category2Slice.actions;

export default category2Slice.reducer;
