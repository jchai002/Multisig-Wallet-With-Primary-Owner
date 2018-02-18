import {
  GET_MULTISIG_INFO_SUCCESS,
  GET_MULTISIG_INFO_FAIL
} from "app/constants/ActionTypes";

export default function(
  state = {
    contractFound: null,
    address: null,
    etherBalance: null
  },
  action
) {
  if (action.type === GET_MULTISIG_INFO_SUCCESS) {
    return { contractFound: true, ...action.payload };
  }

  if (action.type === GET_MULTISIG_INFO_FAIL) {
    return { contractFound: false };
  }

  return state;
}
