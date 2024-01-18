import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  getCategory2ListRequest,
  getCategory2ListSuccess,
  getCategory2ListFail,
} from "../slicers/category2.slice";

function* getCategory2ListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/categories2");
    yield put(getCategory2ListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCategory2ListFail({ error: "Lỗi..." }));
  }
}

export default function* category2Saga() {
  yield takeEvery(getCategory2ListRequest, getCategory2ListSaga);
}
