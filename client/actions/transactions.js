import * as web3Utils from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
import { getMultisigTruffle, getMultisigInstance } from "app/util/contract";
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
    const multisig = await getMultisigInstance();
    const transaction = await multisig.submitTransaction(
      destination,
      web3.toWei(amount, "ether"),
      "",
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        const response = await api.post("/transactions", { transactionHash });
        if (response.status === 200) {
          return dispatch({
            type: SUBMIT_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          return dispatch({ type: SUBMIT_TRANSACTION_FAIL });
        }
      }
    );
  };
}

export function confirmTransaction(transactionId) {
  return async dispatch => {
    const web3 = web3Utils.storedWeb3();
    const sender = web3.eth.accounts[0];
    const multisig = await getMultisigInstance();
    multisig.confirmTransaction(
      transactionId,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        const response = await api.put(
          `/transactions/${transactionId}/confirm`,
          {
            transactionHash
          }
        );
        if (response.status === 200) {
          return dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          return dispatch({ type: UPDATE_TRANSACTION_FAIL });
        }
      }
    );
  };
}

export function revokeConfirmation(transactionId) {
  return async dispatch => {
    const web3 = web3Utils.storedWeb3();
    const sender = web3.eth.accounts[0];
    const multisig = await getMultisigInstance();
    multisig.revokeConfirmation(
      transactionId,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        const response = await api.put(
          `/transactions/${transactionId}/revoke`,
          {
            transactionHash
          }
        );
        if (response.status === 200) {
          return dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          return dispatch({ type: UPDATE_TRANSACTION_FAIL });
        }
      }
    );
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
