import * as web3Utils from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
import { getWallet } from "app/util/contract";
import {
  GET_TRANSACTIONS_SUCCESS,
  SUBMIT_TRANSACTION_SUCCESS
} from "app/constants/ActionTypes";

export function submitTransaction(destination, amount) {
  return async dispatch => {
    console.log("submitTransaction");
    const web3 = web3Utils.storedWeb3();
    const sender = web3.eth.accounts[0];
    const wallet = await getWallet();
    const transaction = await wallet.submitTransaction(
      destination,
      amount,
      "",
      {
        from: sender
      }
    );
    const response = await api.post("/transactions", { transaction });
    dispatch({ type: SUBMIT_TRANSACTION_SUCCESS });
  };
}

export function getTransactions() {
  return async dispatch => {
    const response = await api.get("/transactions");
    if (response.data) {
      dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: response.data });
    }
  };
}
