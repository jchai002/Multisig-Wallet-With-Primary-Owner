import * as promisedWeb3 from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
const contract = require("truffle-contract");
// import Multisig from "contracts/MultisigAccount.json";

function getAccount() {}

export function sendEther(destination, amount) {
  return async dispatch => {
    let tx_hash = await promisedWeb3.sendEther(destination, amount);
    console.log(tx_hash);
    // var response = await api.post("/transactions", { tx_hash });
  };
}
