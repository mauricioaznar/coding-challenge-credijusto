import {ActionType} from "../action-types";
import {User} from "../../models/user";

interface SetCurrentUser {
    type: ActionType.SET_CURRENT_USER;
    payload: User;
}

export type Action = SetCurrentUser;
