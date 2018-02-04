import {
  GET_WALLET_INFO_SUCCESS,
  GET_WALLET_INFO_FAIL
} from "app/constants/ActionTypes";
import * as promisedWeb3 from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function sendEther(destination, amount) {
  return async dispatch => {
    let tx_hash = await promisedWeb3.sendEther(destination, amount);
    console.log(tx_hash);
    // var response = await api.post("/transactions", { tx_hash });
  };
}
