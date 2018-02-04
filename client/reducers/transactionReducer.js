import {
  GET_TRANSACTIONS_SUCCESS,
  SUBMIT_TRANSACTION_SUCCESS
} from "app/constants/ActionTypes";

export default function(state = null, action) {
  if (action.type === GET_TRANSACTIONS_SUCCESS) {
    const foundTransactions = [...action.payload];
    return { foundTransactions };
  }

  return state;
}
