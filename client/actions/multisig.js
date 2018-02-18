import {
  GET_MULTISIG_INFO_SUCCESS,
  GET_MULTISIG_INFO_FAIL
} from "app/constants/ActionTypes";
import { getMultisigAddress } from "app/util/contract";
import { getEtherBalance } from "app/util/web3";

export function getMultisigInfo() {
  return async dispatch => {
    var address;
    try {
      address = await getMultisigAddress();
    } catch (e) {
      console.error(e);
      dispatch({
        type: GET_MULTISIG_INFO_FAIL
      });
    } finally {
      if (address) {
        let etherBalance = await getEtherBalance(address);
        dispatch({
          type: GET_MULTISIG_INFO_SUCCESS,
          payload: { address, etherBalance }
        });
      }
    }
  };
}
