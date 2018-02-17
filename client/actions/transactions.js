import * as web3Utils from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
import { getWallet } from "app/util/contract";
import {
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  SUBMIT_TRANSACTION_SUCCESS,
  SUBMIT_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL
} from "app/constants/ActionTypes";
const maxGasToPay = 300000;

export function submitTransaction(destination, amount) {
  return async dispatch => {
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
    if (response.status === 200) {
      return dispatch({
        type: SUBMIT_TRANSACTION_SUCCESS,
        payload: response.data
      });
    } else {
      return dispatch({ type: SUBMIT_TRANSACTION_FAIL });
    }
  };
}

export function confirmTransaction(transactionId) {
  return async dispatch => {
    const web3 = web3Utils.storedWeb3();
    const sender = web3.eth.accounts[0];
    const wallet = await getWallet();
    const transaction = await wallet.confirmTransaction(transactionId, {
      from: sender,
      gas: maxGasToPay
    });
    const response = await api.put(`/transactions/${transactionId}/confirm`, {
      transaction
    });
    if (response.status === 200) {
      return dispatch({
        type: UPDATE_TRANSACTION_SUCCESS,
        payload: response.data
      });
    } else {
      return dispatch({ type: UPDATE_TRANSACTION_FAIL });
    }
  };
}

export function revokeConfirmation(transactionId) {
  return async dispatch => {
    const web3 = web3Utils.storedWeb3();
    const sender = web3.eth.accounts[0];
    const wallet = await getWallet();
    const transaction = await wallet.revokeConfirmation(transactionId, {
      from: sender,
      gas: maxGasToPay
    });
    const response = await api.put(`/transactions/${transactionId}/revoke`, {
      transaction
    });
    console.log(response);
    if (response.status === 200) {
      return dispatch({
        type: UPDATE_TRANSACTION_SUCCESS,
        payload: response.data
      });
    } else {
      return dispatch({ type: UPDATE_TRANSACTION_FAIL });
    }
  };
}

export function getTransactions(page) {
  return async dispatch => {
    const response = await api.get("/transactions/" + Number(page));
    if (response.status === 200) {
      return dispatch({
        type: GET_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    } else {
      return dispatch({ type: GET_TRANSACTIONS_FAIL });
    }
  };
}
