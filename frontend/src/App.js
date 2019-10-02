import React from "react";
import { Layout } from "antd";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Transactions } from "./modules";
import { Header, Footer, Content } from "./components";
import "./App.css";

const App = () => (
  <Layout className="App-layout">
    <BrowserRouter>
      <Header />
      <Content>
        <Switch>
          <Route path="/app/transactions" component={Transactions} />
          <Redirect to="/app/transactions" />
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  </Layout>
);

export default App;
