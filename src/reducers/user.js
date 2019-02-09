import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

const initialState = {
  auth: false,
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    
  case USER_LOGGED_IN:
    return {auth: true, token: action.token};

  case USER_LOGGED_OUT:
    return initialState;

  default:
    return state
  }
}
