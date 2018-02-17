const Wallet = artifacts.require("MultisigWallet.sol");

// truffle migrate --owners 0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0,0x1daa654cfbc28f375e0f08f329de219fff50c765,0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7 --required 2

module.exports = deployer => {
  const owners = [
    "0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0",
    "0x1daa654cfbc28f375e0f08f329de219fff50c765",
    "0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7"
  ];
  const sigsRequired = 2;

  return deployer.deploy(Wallet, owners, sigsRequired);
  console.log("Wallet deployed");
  console.log("Owners:", owners);
  console.log("Number of Signatures Required:", sigsRequired);
};
