import * as web3Utils from "app/util/web3";
import { getWallet } from "app/util/contract";
import { GET_SETTINGS_SUCCESS } from "app/constants/ActionTypes";

export function getSettings() {
  return async dispatch => {
    const wallet = await getWallet();
    const owners = await wallet.getOwners();
    const primaryOwner = await wallet.getPrimaryOwner();
    const required = await wallet.required();
    dispatch({
      type: GET_SETTINGS_SUCCESS,
      payload: { owners, primaryOwner, required: required.toNumber() }
    });
  };
}
