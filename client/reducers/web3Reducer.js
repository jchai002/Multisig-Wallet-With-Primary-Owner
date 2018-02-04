import * as ActionTypes from "../constants/ActionTypes";

export default function(state = null, action) {
  if (action.type === ActionTypes.WEB3_INITIALIZED) {
    return action.payload || state;
  }

  return state;
}
