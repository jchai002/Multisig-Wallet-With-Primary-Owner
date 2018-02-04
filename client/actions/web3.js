import { getWeb3 } from "util/web3";
import { WEB3_INITIALIZED } from "../constants/ActionTypes";

export function initializeWeb3() {
  return dispatch => {
    getWeb3().then(payload => {
      dispatch({
        type: WEB3_INITIALIZED,
        payload
      });
    });
  };
}
