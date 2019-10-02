import React from "react";
import { connect } from "react-redux";
import { Popover, Progress, Row, Col, Spin } from "antd";
import _ from "lodash";
import { getBalance, getLoadingTransactions } from "./selectors";
import actions from "./actions";
import "./transactions.css";
import { validationsHelpers } from "../../helpers";

const { calcPercent } = validationsHelpers;

class Balance extends React.Component {
  componentDidMount() {
    const { getBalanceTransactions } = this.props;
    getBalanceTransactions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.balance, nextProps.balance) ||
      !_.isEqual(this.props.loading, nextProps.loading)
    );
  }

  render() {
    const {
      balance: { total, totalCredit, totalDebit, totalTransactions },
      loading
    } = this.props;

    return (
      <Row>
        <Col span={12}>
          <div className="font-mini">Saldo Total</div>
          <div className="font-big">
            <Spin spinning={loading}>{total}</Spin>
          </div>
        </Col>
        <Col span={12} className="text-right">
          <Popover content="Créditos">
            <Progress
              type="circle"
              className="margin-right-10"
              strokeColor="#1890ff"
              percent={calcPercent(totalTransactions, totalCredit)}
              width={80}
            />
          </Popover>

          <Popover content="Débitos">
            <Progress
              type="circle"
              percent={calcPercent(totalTransactions, totalDebit)}
              width={80}
              strokeColor="red"
            />
          </Popover>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = {
  getBalanceTransactions: actions.transactions.balance.get
};

const mapStateToProps = state => ({
  balance: getBalance(state),
  loading: getLoadingTransactions(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balance);
