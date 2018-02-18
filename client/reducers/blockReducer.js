import { BLOCK_PENDING, BLOCK_MINED } from "app/constants/ActionTypes";

export default function(state = null, action) {
  if (action.type == BLOCK_PENDING || action.type == BLOCK_MINED) {
    return action.type;
  }
  return state;
}
