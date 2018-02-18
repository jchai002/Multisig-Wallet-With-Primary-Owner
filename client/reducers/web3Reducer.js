import { WEB3_INITIALIZED } from "app/constants/ActionTypes";

export default function(state = null, action) {
  if (action.type === WEB3_INITIALIZED) {
    return action.payload || state;
  }

  return state;
}
