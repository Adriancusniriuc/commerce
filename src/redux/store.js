import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}
//this is so the redux logger does not appear in deployment

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store)

export default {store, persistor};
