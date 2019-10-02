import React from "react";
import { Layout } from "antd";
import "./components.css";

const { Content } = Layout;

const CustomContent = ({ children }) => (
  <Content
    style={{
      padding: "0px 10% 0px 10%"
    }}
  >
    {children}
  </Content>
);

export default CustomContent;
