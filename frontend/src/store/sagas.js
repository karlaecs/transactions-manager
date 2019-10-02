import { all, fork } from "redux-saga/effects";
import _ from "lodash";
import { transactionsSagas } from "../modules";

export default function*() {
  const _sagas = [transactionsSagas];
  yield all(_.map(_sagas, _.unary(fork)));
}
