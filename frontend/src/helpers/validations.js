import _ from "lodash";

const convertFieldToNumberForm = ev => {
  const targetValue = _.get(ev, "currentTarget.value");
  const convertedValue = _.toNumber(targetValue);

  if (_.isNaN(convertedValue)) {
    return targetValue;
  }
  return convertedValue;
};

const parseToCurrencyReal = value => {
  const v = ((value.replace(/\D/g, "") / 100).toFixed(2) + "").split(".");
  const m = v[0]
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g);

  for (let i = 0; i < m.length; i++)
    m[i] =
      m[i]
        .split("")
        .reverse()
        .join("") + ".";

  const r = m.reverse().join("");

  return r.substring(0, r.lastIndexOf(".")) + "," + v[1];
};

const parseCurrencyRealToFloat = value =>
  parseFloat(
    value
      .replace(/[^0-9,.]/g, "")
      .replace(/[.]/g, "")
      .replace(",", ".")
  );

const calcPercent = (valueTotal, valuePerc) => {
  if (valueTotal || valueTotal !== 0) {
    return ((valuePerc * 100) / valueTotal).toFixed(2);
  }
  return 0;
};

const parseToRealSymbol = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol"
  });

export default {
  convertFieldToNumberForm,
  parseToCurrencyReal,
  parseCurrencyRealToFloat,
  calcPercent,
  parseToRealSymbol
};
