import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authReducer from "./redux/slicers/auth.slice";
import productReducer from "./redux/slicers/product.slice";
import cartReducer from "./redux/slicers/cart.slice";
import locationReducer from "./redux/slicers/location.slice";
import orderReducer from "./redux/slicers/order.slice";

import categoryReducer from "./redux/slicers/category.slice";
import typeReducer from "./redux/slicers/type.slice";
import taskReducer from "./redux/slicers/task.slice";
import commonReducer from "./redux/slicers/common.slice";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    location: locationReducer,
    order: orderReducer,
    type: typeReducer,
    task: taskReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
