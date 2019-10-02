import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import {
  getOptionsFieldDecorationForm,
  getLoadingTransactions,
  getErrorTransactions
} from "./selectors";
import actions from "./actions";
import { FormTransactions } from "../../components";

class FormTransactionContainer extends React.Component {
  state = {
    confirmDirty: false
  };

  onSubmit = e => {
    const { form, createTransaction, onCancel } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, transaction) => {
      if (!err) {
        createTransaction({ transaction });
        onCancel();
      }
    });
  };

  onConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;

    this.setState({ confirmDirty: confirmDirty || !!value });
  };
  render() {
    const { form, submitting, onCancel } = this.props;
    const options = getOptionsFieldDecorationForm();

    return (
      <FormTransactions
        form={form}
        options={options}
        submitting={submitting}
        onCancel={onCancel}
        onSubmit={this.onSubmit}
        onConfirmBlur={this.onConfirmBlur}
      />
    );
  }
}

const mapDispatchToProps = {
  createTransaction: actions.transactions.create
};

const mapStateToProps = state => ({
  submitting: getLoadingTransactions(state),
  error: getErrorTransactions(state)
});

const WrappedFormTransaction = Form.create({ name: "FormTransaction" })(
  FormTransactionContainer
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedFormTransaction);
