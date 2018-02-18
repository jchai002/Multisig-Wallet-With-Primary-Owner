import store from "app/store";
import { getAccountInfo } from "app/actions/account";
import { getMultisigTruffleInfo } from "app/actions/multisig";
import { getEtherBalance } from "app/util/web3";
import { getMultisigTruffleAddress } from "app/util/contract";

export async function pollForAccountUpdate() {
  const multisig = await getMultisigTruffleAddress();
  const web3 = store.getState().web3;
  // clear existing timeouts
  var timeoutId = window.setTimeout(function() {}, 0);
  while (timeoutId--) {
    window.clearTimeout(timeoutId);
  }
  setTimeout(async () => {
    var metamaskAddress = web3.eth.accounts[0];
    var storedAddress = store.getState().account.address;
    var storedETHBalance = store.getState().multisig.etherBalance;
    var multisigBalance = await getEtherBalance(multisig);
    if (metamaskAddress !== storedAddress) {
      store.dispatch(getAccountInfo());
    }
    if (storedETHBalance !== multisigBalance) {
      store.dispatch(getMultisigTruffleInfo());
    }
    pollForAccountUpdate();
  }, 800);
}
