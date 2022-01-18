import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import {User} from "../../types/user";


export const setCurrentUser = (user: User) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CURRENT_USER,
      payload: user,
    });
  };
};