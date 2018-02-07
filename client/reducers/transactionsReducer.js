import {
  GET_TRANSACTIONS_SUCCESS,
  SUBMIT_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_SUCCESS
} from "app/constants/ActionTypes";
import _ from "lodash";

export default function(state = null, action) {
  if (action.type === GET_TRANSACTIONS_SUCCESS) {
    return [...action.payload];
  }

  if (action.type === CONFIRM_TRANSACTION_SUCCESS) {
    console.log("current state", state);
    const { transactionId } = action.payload;
    const indexToUpdate = _.findIndex(state, { transactionId });
    var newState = [...state];
    newState[indexToUpdate] = action.payload;
    console.log(newState, "newState");
    return newState;
  }

  return state;
}
