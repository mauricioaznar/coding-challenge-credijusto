import {ActionType} from "../action-types";
import {Action} from "../actions";
import {User} from "../../models/user";

interface AuthState {
  currentUser: User | null;
}

const initialState = {
  currentUser: null,
};

const reducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
