import React from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Layout, Menu, Icon } from "antd";
import "./components.css";

const { Header } = Layout;
const items = [
  { id: "transactions", key: "1", title: "Transações", to: "/app/transactions" }
];

const CustomHeader = () => (
  <Header
    style={{
      textAlign: "right",
      position: "fixed",
      zIndex: 1,
      width: "100%",
      padding: "0px 5px 0px 10%"
    }}
  >
    <div title="Logo" className="logo" />
    <Menu
      className="menu"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{
        lineHeight: "64px",
        padding: 0,
        textAlign: "right"
      }}
    >
      {_.map(items, item => (
        <Menu.Item key={item.key}>
          <NavLink to={item.to}>{item.title}</NavLink>
        </Menu.Item>
      ))}
      <Menu.SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
          </span>
        }
      />
    </Menu>
  </Header>
);

export default CustomHeader;
