import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import * as createHistory from "history";
import Home from "../components/Home";

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
export const history = createHistory.createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;