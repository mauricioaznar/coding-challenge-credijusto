import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {rootReducer, RootState} from "./reducers";

export { rootReducer }

export const middlewares = [thunk]

const temporaryDefaultState: RootState = {
    auth: {
        currentUser: {
            firstName: "maria",
            lastName: "perez",
            email: "maria@perez.com",
            telephone: "999999999"
        }
    }
}

export const store = createStore(
  rootReducer,
  temporaryDefaultState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

