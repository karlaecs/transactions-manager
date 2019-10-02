import { takeLatest, call, put } from "redux-saga/effects";
import { message } from "antd";
import actions from "./actions";
import { HTTPWithoutAuth } from "../auth";
import { errorHelpers } from "../../helpers";

const { notifyError } = errorHelpers;

function* fetchTransactions({ payload }) {
  try {
    yield put(actions.transactions.loading(true));
    const response = yield call(HTTPWithoutAuth.get, "/transactions");
    yield put(actions.transactions.resolve(response.data));
  } catch (err) {
    yield put(actions.transactions.error(err));
    yield call(notifyError, { err });
  } finally {
    yield put(actions.transactions.loading(false));
  }
}

function* createTransactions({ payload }) {
  const { transaction } = payload;
  try {
    yield put(actions.transactions.loading(true));
    yield call(HTTPWithoutAuth.post, "/transactions", transaction);
    yield put(actions.transactions.fetch());
    yield put(actions.transactions.balance.get());
    yield message.success("Transação criada com sucesso");
  } catch (err) {
    yield put(actions.transactions.error(err));
    yield call(notifyError, { err });
  } finally {
    yield put(actions.transactions.loading(false));
  }
}

function* getBalanceTransactions({ payload }) {
  try {
    yield put(actions.transactions.loading(true));
    const response = yield call(HTTPWithoutAuth.get, "/balances");
    yield put(actions.transactions.balance.resolve(response.data));
    yield put(actions.transactions.fetch());
  } catch (err) {
    yield put(actions.transactions.error(err));
    yield call(notifyError, { err });
  } finally {
    yield put(actions.transactions.loading(false));
  }
}

export default function*() {
  yield [
    yield takeLatest(actions.transactions.fetch, fetchTransactions),
    yield takeLatest(actions.transactions.create, createTransactions),
    yield takeLatest(actions.transactions.balance.get, getBalanceTransactions)
  ];
}
