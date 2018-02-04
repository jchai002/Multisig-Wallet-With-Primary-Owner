import {
  GET_WALLET_INFO_SUCCESS,
  GET_WALLET_INFO_FAIL
} from "app/constants/ActionTypes";

export default function(
  state = {
    accountFound: null,
    address: null,
    etherBalance: null
  },
  action
) {
  if (action.type === GET_WALLET_INFO_SUCCESS) {
    return { accountFound: true, ...action.payload };
  }

  if (action.type === GET_WALLET_INFO_FAIL) {
    return { accountFound: false };
  }

  return state;
}