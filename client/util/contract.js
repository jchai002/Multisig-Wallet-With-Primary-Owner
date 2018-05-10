const truffle = require("truffle-contract");
import Multisig from "contracts/MultisigWalletWithPrimaryOwner.json";
import { storedWeb3 } from "app/util/web3";
import detectNetwork from "web3-detect-network";

export async function getMultisigTruffle() {
  const MultisigContract = truffle(Multisig);
  MultisigContract.setProvider(storedWeb3().currentProvider);
  return await MultisigContract.deployed();
}

export async function getMultisigTruffleAddress() {
  const multisig = await getMultisigTruffle();
  return multisig.address;
}

export async function getMultisigInstance() {
  const web3 = await storedWeb3();
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(Multisig.abi)
    .at(Multisig.networks[network.id].address);
}
