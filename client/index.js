import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import requireAccount from "./components/HOC/require_account";

// Layouts
import App from "App";
import NewTx from "app/components/NewTx";
import Transactions from "app/components/Transactions";
import Settings from "app/components/Settings";
import MissingAccount from "app/components/Error/MissingAccount";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAccount(NewTx)} />
        <Route path="missing-account" component={MissingAccount} />
        <Route path="settings" component={requireAccount(Settings)} />
        <Route path="transactions" component={requireAccount(Transactions)} />
        <Route
          path="transactions/:page"
          component={requireAccount(Transactions)}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
