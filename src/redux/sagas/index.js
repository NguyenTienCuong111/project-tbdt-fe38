import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import locationSaga from "./location.saga";
import orderSaga from "./order.saga";
import reviewSaga from "./review.saga";
import favoriteSaga from "./favorite.saga";
import typeSaga from "./type.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(typeSaga);
  yield fork(locationSaga);
  yield fork(orderSaga);
  yield fork(reviewSaga);
  yield fork(favoriteSaga);
}
