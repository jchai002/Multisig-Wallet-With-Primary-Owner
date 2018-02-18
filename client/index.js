import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import requireAuth from "./components/HOC/require_auth";

// Layouts
import App from "App";
import NewTx from "app/components/NewTx";
import Transactions from "app/components/Transactions";
import Settings from "app/components/Settings";
import MissingAccount from "app/components/Error/MissingAccount";
import Unauthorized from "app/components/Error/Unauthorized";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuth(NewTx)} />
        <Route path="settings" component={requireAuth(Settings)} />
        <Route path="transactions" component={requireAuth(Transactions)} />
        <Route
          path="transactions/:page"
          component={requireAuth(Transactions)}
        />
      </Route>
      <Route path="missing-account" component={MissingAccount} />
      <Route path="unauthorized" component={Unauthorized} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
