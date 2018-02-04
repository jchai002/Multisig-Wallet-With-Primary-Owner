import { GET_SETTINGS_SUCCESS } from "app/constants/ActionTypes";

export default function(state = null, action) {
  if (action.type === GET_SETTINGS_SUCCESS) {
    return { ...action.payload };
  }

  return state;
}
