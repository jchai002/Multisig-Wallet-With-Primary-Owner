import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import account from "./accountReducer";
import multisig from "./multisigReducer";
import transactions from "./transactionsReducer";
import block from "./blockReducer";
import settings from "./settingsReducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account,
  multisig,
  transactions,
  block,
  settings
});

export default reducer;
