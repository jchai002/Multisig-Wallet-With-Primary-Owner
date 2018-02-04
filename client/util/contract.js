const contract = require("truffle-contract");
import Wallet from "contracts/MultiSigWallet.json";
import { getWeb3 } from "app/util/web3";

export async function getWallet() {
  const web3 = await getWeb3();
  const WalletContract = contract(Wallet);
  WalletContract.setProvider(web3.currentProvider);
  return await WalletContract.deployed();
}
