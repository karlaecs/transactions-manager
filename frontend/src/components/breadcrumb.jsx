import React from "react";
import { Breadcrumb } from "antd";
import _ from "lodash";

const CustomBreadcrumb = ({ items }) => (
  <Breadcrumb style={{ marginTop: "80px" }}>
    {_.map(items, (item, key) => (
      <Breadcrumb.Item key={key}>{item.title}</Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default CustomBreadcrumb;
