import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import wallet from "./walletReducer";
import transaction from "./transactionReducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  wallet,
  transaction
});

export default reducer;
