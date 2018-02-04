import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

import requireWallet from "./components/HOC/require_wallet";

// Layouts
import App from "App";
import Wallet from "app/components/Wallet";
import Transactions from "app/components/Transactions";
import MissingWeb3 from "app/components/Error/MissingWeb3";
import MissingWallet from "app/components/Error/MissingWallet";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireWallet(Wallet)} />
        <Route path="missing-web3" component={MissingWeb3} />
        <Route path="missing-wallet" component={MissingWallet} />
        <Route path="transactions" component={requireWallet(Transactions)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
