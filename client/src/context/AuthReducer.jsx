import { LOGIN_USER, LOGOUT_USER } from "./AuthActions";
import {createStore} from 'redux'

const initialState = {
  current_user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
     case LOGIN_USER:
        return { ...state, current_user: action.payload};
     case LOGOUT_USER:
        return { ...state, current_user: action.payload};
     default:
        return state;
  }
};

const store = createStore(reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;