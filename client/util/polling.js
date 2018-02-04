import store from "app/store";
import { getAccountInfo } from "app/actions/account";
import { getEtherBalance, getTokenBalance } from "app/util/web3";

export function pollForAccountUpdate() {
  setTimeout(async () => {
    var web3 = store.getState().web3;
    var metamaskAddress = web3.eth.accounts[0];
    var storedAddress = store.getState().account.address;
    var storedETHBalance = store.getState().account.etherBalance;
    var storedTokenBalance = store.getState().account.tokenBalance;

    // update account display if address or balance changes
    if (
      metamaskAddress !== storedAddress ||
      storedETHBalance !== (await getEtherBalance()) ||
      storedTokenBalance !== (await getTokenBalance())
    ) {
      store.dispatch(getAccountInfo());
    }
    pollForAccountUpdate();
  }, 800);
}
