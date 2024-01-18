import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import product2Saga from "./product2.saga";
import categorySaga from "./category.saga";
import category2Saga from "./category2.saga";

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(product2Saga);
  yield fork(categorySaga);
  yield fork(category2Saga);
}
