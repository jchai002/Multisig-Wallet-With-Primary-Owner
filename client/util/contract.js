const contract = require("truffle-contract");
import Multisig from "contracts/MultiSigWallet.json";
import { storedWeb3 } from "app/util/web3";

export async function getMultisig() {
  const MultisigContract = contract(Multisig);
  MultisigContract.setProvider(storedWeb3().currentProvider);
  return await MultisigContract.deployed();
}

export async function getMultisigAddress() {
  const multisig = await getMultisig();
  return multisig.address;
}
