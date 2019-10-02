import reduxSaga from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import sagas from "./sagas";

const saga = reduxSaga();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(saga));
const store = createStore(rootReducer, enhancer);

saga.run(sagas);
export default store;
