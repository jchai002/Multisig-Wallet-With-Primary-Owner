import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import account from "./accountReducer";
import transaction from "./transactionReducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  account,
  transaction
});

export default reducer;