import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import productReducer from "./redux/slicers/product.slice";
import product2Reducer from "./redux/slicers/product2.slice";
import categoryReducer from "./redux/slicers/category.slice";
import category2Reducer from "./redux/slicers/category2.slice";
import taskReducer from "./redux/slicers/task.slice";
import commonReducer from "./redux/slicers/common.slice";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    product2: product2Reducer,
    category: categoryReducer,
    category2: category2Reducer,
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
