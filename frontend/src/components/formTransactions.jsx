import React from "react";
import { Row, Form, Select, Button, Input, InputNumber, Divider } from "antd";
import "./components.css";

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 11 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 5 },
    xxl: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 14 },
    lg: { span: 14 },
    xl: { span: 14 },
    xxl: { span: 14 }
  }
};

const FormTransaction = ({
  form: { getFieldProps },
  onConfirmBlur,
  onSubmit,
  onCancel,
  submitting,
  options
}) => (
  <Form {...formItemLayout} labelAlign="left" onSubmit={onSubmit}>
    <Row gutter={8}>
      {/* Value */}
      <Form.Item label="Valor" hasFeedback>
        <InputNumber
          id="money"
          className="money"
          onBlur={onConfirmBlur}
          style={{ width: "80%" }}
          step={0.2}
          placeholder="Valor da transação..."
          title="Ex. Valor 1000.22"
          {...getFieldProps("value", options.value)}
        />
      </Form.Item>
      {/* Description */}
      <Form.Item label="Descrição" hasFeedback>
        <TextArea
          onBlur={onConfirmBlur}
          placeholder="Descrição da transação..."
          title="Descrição da transação..."
          {...getFieldProps("description", options.description)}
        />
      </Form.Item>
      {/* Type */}
      <Form.Item label="Tipo" hasFeedback>
        <Select
          placeholder="Selectione um tipo de transação..."
          title="Selectione um tipo de transação..."
          {...getFieldProps("type", options.type)}
        >
          <Option value="CREDIT">Crédito</Option>
          <Option value="DEBIT">Débito</Option>
        </Select>
      </Form.Item>
    </Row>
    <Divider />
    <div style={{ textAlign: "left", width: "100%", marginTop: "10px" }}>
      <Button
        htmlType="button"
        onClick={onCancel}
        style={{ marginRight: "10px" }}
      >
        Cancelar
      </Button>
      <Button type="primary" htmlType="submit" loading={submitting}>
        Confirmar
      </Button>
    </div>
  </Form>
);

export default FormTransaction;
