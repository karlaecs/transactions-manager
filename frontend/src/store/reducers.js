import { combineReducers } from "redux";
import _ from "lodash";
import { transactionsReducers } from "../modules";

const combinedReducer = combineReducers({
  ...transactionsReducers
});

const rootReducer = (state, action) =>
  combinedReducer(_.isEqual(action.type, "LOGOUT") ? undefined : state, action);

export default rootReducer;
