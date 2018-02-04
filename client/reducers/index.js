import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import account from "./accountReducer";
import transaction from "./transactionReducer";
import settings from "./settingsReducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account,
  transaction,
  settings
});

export default reducer;
