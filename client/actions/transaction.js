import * as web3Utils from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
const contract = require("truffle-contract");
import Wallet from "contracts/MultiSigWallet.json";
import store from "app/store";

async function getWallet() {
  const WalletContract = contract(Wallet);
  WalletContract.setProvider(store.getState().web3.currentProvider);
  return await WalletContract.deployed();
}

export function submitTransaction(destination, amount) {
  return async dispatch => {
    const web3 = store.getState().web3;
    const sender = web3.eth.accounts[0];
    const wallet = await getWallet();
    var transaction = await wallet.submitTransaction(destination, amount, "", {
      from: sender
    });
    var { tx } = transaction;
    var transactionId = web3Utils.getParamFromTxEvent(
      transaction,
      "transactionId",
      "Submission"
    );

    console.log(transactionId);

    // var response = await api.post("/transactions", { tx });

    // let tx_hash = await web3Utils.sendEther(destination, amount);
    // console.log(tx_hash);
  };
}
