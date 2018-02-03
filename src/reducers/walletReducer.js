import {
  GET_WALLET_INFO_SUCCESS,
  GET_WALLET_INFO_FAIL
} from "app/constants/ActionTypes";

export default function(
  state = {
    walletFound: null,
    address: null,
    etherBalance: null
  },
  action
) {
  if (action.type === GET_WALLET_INFO_SUCCESS) {
    return { walletFound: true, ...action.payload };
  }

  if (action.type === GET_WALLET_INFO_FAIL) {
    return { walletFound: false };
  }

  return state;
}
