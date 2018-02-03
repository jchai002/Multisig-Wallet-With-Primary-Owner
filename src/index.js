import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import requireWallet from "./components/HOC/require_wallet";

// Layouts
import App from "App";
import Home from "app/components/Home";
import Transactions from "app/components/Transactions";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireWallet(Home)} />
        <Route path="transactions" component={requireWallet(Transactions)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
