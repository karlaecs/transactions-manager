import { handleActions } from "redux-actions";
import _ from "lodash";
import { always } from "lodash/fp";
import { combineReducers } from "redux";
import actions from "./actions";

const initialBalance = {
  total: 0,
  totalCredit: 0,
  totalDebit: 0,
  totalTransactions: 0
};

const transactions = combineReducers({
  data: handleActions(
    {
      [actions.transactions.resolve]: (state, action) =>
        _.get(action, "payload")
    },
    null
  ),
  balance: handleActions(
    {
      [actions.transactions.balance.resolve]: (state, action) =>
        _.get(action, "payload")
    },
    initialBalance
  ),

  loading: handleActions(
    {
      [actions.transactions.loading]: (state, action) =>
        _.get(action, "payload")
    },
    false
  ),
  error: handleActions(
    {
      [actions.transactions.error]: (state, action) => _.get(action, "payload"),
      [actions.transactions.resolve]: always(null)
    },
    null
  )
});

export default {
  transactions
};
