import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import requireAccount from "./components/HOC/require_account";

// Layouts
import App from "App";
import Wallet from "app/components/Wallet";
import Transactions from "app/components/Transactions";
import MissingWeb3 from "app/components/Error/MissingWeb3";
import MissingAccount from "app/components/Error/MissingAccount";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAccount(Wallet)} />
        <Route path="missing-web3" component={MissingWeb3} />
        <Route path="missing-account" component={MissingAccount} />
        <Route path="transactions" component={requireAccount(Transactions)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
