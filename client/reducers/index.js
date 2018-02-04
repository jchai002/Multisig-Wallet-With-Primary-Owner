import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import wallet from "./walletReducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3,
  wallet
});

export default reducer;
