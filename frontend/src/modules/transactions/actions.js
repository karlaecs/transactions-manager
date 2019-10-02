import { createActions } from "redux-actions";
import _ from "lodash";

export default createActions({
  TRANSACTIONS: {
    FETCH: _.identity,
    RESOLVE: _.identity,
    LOADING: _.identity,
    ERROR: _.identity,
    CREATE: _.identity,
    BALANCE: {
      GET: _.identity,
      RESOLVE: _.identity
    }
  }
});
