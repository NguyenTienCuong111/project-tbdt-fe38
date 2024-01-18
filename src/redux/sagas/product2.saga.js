import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  getProduct2ListRequest,
  getProduct2ListSuccess,
  getProduct2ListFail,
  getProduct2DetailRequest,
  getProduct2DetailSuccess,
  getProduct2DetailFail,
} from "../slicers/product2.slice";

function* getProduct2ListSaga(action) {
  try {
    const { category2Id } = action.payload;
    const result = yield axios.get("http://localhost:4000/products2", {
      params: {
        category2Id: category2Id,
      },
    });
    yield put(getProduct2ListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProduct2ListFail({ error: "Lỗi..." }));
  }
}

function* getProduct2DetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products2/${id}`);
    yield put(getProduct2DetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProduct2DetailFail({ error: "Lỗi..." }));
  }
}

export default function* product2Saga() {
  yield takeEvery(getProduct2ListRequest, getProduct2ListSaga);
  yield takeEvery(getProduct2DetailRequest, getProduct2DetailSaga);
}
