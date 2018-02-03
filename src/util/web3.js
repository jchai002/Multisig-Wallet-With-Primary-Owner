import Web3 from "web3";
import store from "app/store";
import tokenJSON from "contracts/MultisigToken.json";
import detectNetwork from "web3-detect-network";

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

export function getWalletAddress() {
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

export function getWalletInfo() {
  return new Promise(async (resolve, reject) => {
    const walletAddress = await getWalletAddress();
    const balance = await getEtherBalance();
    resolve({ walletAddress, balance });
  });
}

export function getEtherBalance() {
  return new Promise(async (resolve, reject) => {
    const web3 = store.getState().web3;
    const walletAddress = await getWalletAddress();
    // get balance
    web3.eth.getBalance(walletAddress, (err, wei) => {
      if (err) {
        reject(err);
      }
      resolve(web3.fromWei(wei, "ether").toNumber());
    });
  });
}

export function sendEther(amount) {
  return new Promise(async (resolve, reject) => {
    const web3 = store.getState().web3;
    const walletAddress = await getWalletAddress();
    web3.eth.sendTransaction(
      {
        from: walletAddress,
        to: process.env.FACEOFF_WALLET_ADDRESS,
        value: web3.toWei(amount, "ether"),
        gas: 50000
      },
      async (err, tx_hash) => {
        if (err) {
          reject(err);
        }
        resolve(tx_hash);
      }
    );
  });
}

export function sendToken(amount) {
  return new Promise(async (resolve, reject) => {
    const walletAddress = await getWalletAddress();
    const tokenContract = await getTokenContract();
    const decimals = await getTokenDecimals(tokenContract);
    const normalizedAmount = amount * Math.pow(10, decimals);
    tokenContract.transfer(
      process.env.FACEOFF_WALLET_ADDRESS,
      normalizedAmount,
      {
        from: walletAddress,
        gas: 4612388
      },
      function(err, tx_hash) {
        if (err) {
          reject(err);
        }
        resolve(tx_hash);
      }
    );
  });
}

export async function getTokenBalance() {
  const walletAddress = await getWalletAddress();
  const tokenContract = await getTokenContract();
  const decimals = await getTokenDecimals(tokenContract);
  return new Promise((resolve, reject) => {
    tokenContract.balanceOf(walletAddress, function(err, balance) {
      if (err) {
        reject(err);
      }
      resolve(balance.toNumber() / Math.pow(10, decimals));
    });
  });
}

// helpers
async function getTokenContract() {
  const web3 = store.getState().web3;
  const tokenContractAddress =
    process.env.TOKEN_CONTRACT_ADDRESS || web3.eth.accounts[0];
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(tokenJSON.abi)
    .at(tokenContractAddress || tokenJSON.networks[network.id].address);
}

function getTokenDecimals(tokenContract) {
  return new Promise(async (resolve, reject) => {
    tokenContract.decimals(function(err, decimals) {
      if (err) {
        reject(err);
      }
      resolve(decimals.toNumber());
    });
  });
}
