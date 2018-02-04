import * as web3Utils from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
import { getWallet } from "app/util/contract";

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
    // var { tx } = transaction;
    // var transactionId = web3Utils.getParamFromTxEvent(
    //   transaction,
    //   "transactionId",
    //   "Submission"
    // );
    //
    // console.log(transactionId);

    var response = await api.post("/transactions", { transaction });

    console.log(response);
    // let tx_hash = await web3Utils.sendEther(destination, amount);
    // console.log(tx_hash);
  };
}
