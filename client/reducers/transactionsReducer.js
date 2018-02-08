import {
  GET_TRANSACTIONS_SUCCESS,
  SUBMIT_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_SUCCESS
} from "app/constants/ActionTypes";
import _ from "lodash";

export default function(state = null, action) {
  if (action.type === GET_TRANSACTIONS_SUCCESS) {
    return { ...action.payload };
  }

  if (action.type === CONFIRM_TRANSACTION_SUCCESS) {
    const { transactionId } = action.payload;
    const indexToUpdate = _.findIndex(state.transactionsOnPage, {
      transactionId
    });
    var transactionsOnPage = [...state.transactionsOnPage];
    transactionsOnPage[indexToUpdate] = action.payload;
    return {
      transactionsOnPage,
      pageNumber: state.pageNumber,
      totalPages: state.totalPages
    };
  }

  return state;
}
