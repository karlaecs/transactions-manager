import React from "react";
import { connect } from "react-redux";
import {
  Steps,
  Icon,
  Divider,
  BackTop,
  Row,
  Col,
  Button,
  Drawer,
  Popover,
  Empty,
  Spin
} from "antd";
import _ from "lodash";
import { Breadcrumb } from "../../components";
import Balance from "./balance";
import FormContainer from "./formContainer";
import {
  getMakeTransactions,
  getLoadingTransactions,
  getErrorTransactions
} from "./selectors";
import actions from "./actions";
import "./transactions.css";

const { Step } = Steps;
const breadcrumbItems = [
  { key: 1, title: "Transações" },
  { key: 2, title: "Listar" }
];

const initialState = {
  showDrawerCreate: false
};

class Transactions extends React.Component {
  state = initialState;

  componentDidMount() {
    const { fetchTransactions } = this.props;
    fetchTransactions();
  }

  onClickCreateTransaction = () => this.setState({ showDrawerCreate: true });

  onCloseDrawer = () => this.setState({ showDrawerCreate: false });

  render() {
    const { showDrawerCreate } = this.state;
    const { data, loading } = this.props;
    const isEmpty = _.isEmpty(data) && !loading;

    return (
      <React.Fragment>
        <Breadcrumb items={breadcrumbItems} />
        <div className="content">
          <Balance />
          <Divider />
          <Spin spinning={loading}>
            {isEmpty ? (
              <Empty
                style={{ paddingTop: "5%" }}
                description={
                  <div>
                    <div>
                      Clique no botão (+) para adicionar uma nova transação ou
                    </div>
                    <br />
                    <Button
                      size="small"
                      type="primary"
                      ghost
                      onClick={this.onClickCreateTransaction}
                    >
                      Criar Nova Transação
                    </Button>
                  </div>
                }
              />
            ) : (
              <Steps direction="vertical" size="small">
                {_.map(data, (d, key) => (
                  <Step
                    key={key}
                    status={d.status}
                    title={
                      <Row>
                        <Col span={12}>{d.value}</Col>
                        <Col className="text-right" span={12}>
                          {d.date}
                        </Col>
                      </Row>
                    }
                    description={d.description}
                    icon={<Icon type={d.icon} style={{ fontSize: "25px" }} />}
                  />
                ))}
              </Steps>
            )}
          </Spin>

          <Popover content="Nova Transação" placement="topRight">
            <Button
              className="button-new"
              size="large"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={this.onClickCreateTransaction}
            />
          </Popover>
        </div>
        <BackTop />

        <Drawer
          id="transaction-create"
          title="Criar Nova Transação"
          visible={showDrawerCreate}
          onClose={this.onCloseDrawer}
          width="50%"
          destroyOnClose
        >
          <FormContainer onCancel={this.onCloseDrawer} />
        </Drawer>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchTransactions: actions.transactions.fetch
};

const mapStateToProps = state => ({
  data: getMakeTransactions(state),
  loading: getLoadingTransactions(state),
  error: getErrorTransactions(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
