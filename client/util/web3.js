import Web3 from "web3";
import store from "app/store";

export function getWeb3() {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => {
      var web3 = window.web3;
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider);
        console.log("Injected web3 detected.");
      }
      // Fallback to localhost if no web3 injection. Requires a server
      // else {
      //   var provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      //   web3 = new Web3(provider);
      //   console.log("No web3 instance injected, using Local web3.");
      // }
      resolve(web3);
    });
  });
}

export function getAccountAddress() {
  return new Promise(async (resolve, reject) => {
    const web3 = store.getState().web3;
    web3.eth.getCoinbase((err, address) => {
      if (err) {
        reject(err);
      }
      if (!address) {
        reject("no address found");
      }
      resolve(address);
    });
  });
}

export function getAccountInfo() {
  return new Promise(async (resolve, reject) => {
    const accountAddress = await getAccountAddress();
    const balance = await getEtherBalance(accountAddress);
    resolve({ accountAddress, balance });
  });
}

export function getEtherBalance(accountAddress) {
  return new Promise(async (resolve, reject) => {
    const web3 = store.getState().web3;
    // get balance
    web3.eth.getBalance(accountAddress, (err, wei) => {
      if (err) {
        reject(err);
      }
      resolve(web3.fromWei(wei, "ether").toNumber());
    });
  });
}

export function getParamFromTxEvent(transaction, paramName, eventName) {
  let logs = transaction.logs;
  if (eventName != null) {
    logs = logs.filter(l => l.event === eventName);
  }
  return logs[0].args[paramName];
}
