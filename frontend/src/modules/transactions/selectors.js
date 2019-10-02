import _ from "lodash";
import { enumsHelpers, validationsHelpers } from "../../helpers";
import moment from "moment";

const {
  enumTransactions: { types }
} = enumsHelpers;
const { parseToRealSymbol } = validationsHelpers;
const getTransactions = state => _.get(state, "transactions.data");
const getLoadingTransactions = state => _.get(state, "transactions.loading");
const getErrorTransactions = state => _.get(state, "transactions.error");
const getBalance = state => {
  const balance = _.get(state, "transactions.balance");
  const total = parseToRealSymbol(balance.total);
  return {
    ...balance,
    total
  };
};

const getMakeTransactions = state => {
  const transactions = getTransactions(state);
  return _.map(transactions, t => {
    const isCredit = t.type === types.credit;

    return {
      ...t,
      icon: isCredit ? "plus-circle" : "minus-circle",
      status: isCredit ? "finish" : "error",
      value: `${isCredit ? "Crédito de " : "Débito de -"} ${parseToRealSymbol(
        t.value
      )}`,
      date: moment(t.created_at).format("lll")
    };
  });
};

const getOptionsFieldDecorationForm = () => ({
  value: {
    // getValueFromEvent: ev => convertFieldToNumberForm(ev),
    rules: [
      {
        required: true,
        message: "Campo Obrigatório!"
      }
      // {
      //   type: "number",
      //   min: 0,
      //   message: "Número Inválido"
      // }
    ]
  },
  description: {
    rules: [
      {
        required: true,
        message: "Campo Obrigatório!"
      }
    ]
  },
  type: {
    rules: [
      {
        required: true,
        message: "Campo Obrigatório!"
      },
      {
        max: 200,
        message: "Tamanho máximo excedido!"
      }
    ]
  }
});

export {
  getTransactions,
  getLoadingTransactions,
  getErrorTransactions,
  getOptionsFieldDecorationForm,
  getMakeTransactions,
  getBalance
};
