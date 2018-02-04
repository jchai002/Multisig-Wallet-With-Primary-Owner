import {
  GET_WALLET_INFO_SUCCESS,
  GET_WALLET_INFO_FAIL
} from "app/constants/ActionTypes";
import { getWalletAddress, getEtherBalance } from "app/util/web3";

export function getWalletInfo(web3) {
  return async dispatch => {
    try {
      var address = await getWalletAddress();
    } catch (e) {
      console.error(e);
      dispatch({
        type: GET_WALLET_INFO_FAIL
      });
    } finally {
      if (address) {
        let etherBalance = await getEtherBalance(address);
        dispatch({
          type: GET_WALLET_INFO_SUCCESS,
          payload: { address, etherBalance }
        });
      }
    }
  };
}
