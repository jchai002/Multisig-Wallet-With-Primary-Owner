import {
  GET_ACCOUNT_INFO_SUCCESS,
  GET_ACCOUNT_INFO_FAIL
} from "app/constants/ActionTypes";
import { getAccountAddress, getEtherBalance } from "app/util/web3";

export function getAccountInfo() {
  return async dispatch => {
    try {
      var address = await getAccountAddress();
    } catch (e) {
      console.error(e);
      dispatch({
        type: GET_ACCOUNT_INFO_FAIL
      });
    } finally {
      if (address) {
        let etherBalance = await getEtherBalance(address);
        dispatch({
          type: GET_ACCOUNT_INFO_SUCCESS,
          payload: { address, etherBalance }
        });
      }
    }
  };
}
