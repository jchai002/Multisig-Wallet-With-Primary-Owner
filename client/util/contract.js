const contract = require("truffle-contract");
import Wallet from "contracts/MultiSigWallet.json";
import { storedWeb3 } from "app/util/web3";

export async function getWallet() {
  const WalletContract = contract(Wallet);
  WalletContract.setProvider(storedWeb3().currentProvider);
  return await WalletContract.deployed();
}
