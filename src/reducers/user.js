import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import jwt from 'jwt-decode';
import moment from 'moment';

const isUserAuthenticated = () => {
  let token = localStorage.pitsJWT;
  if (token) {
    let expirationDate = moment(jwt(token).exp * 1000);
    return moment().isBefore(expirationDate);
  }
  return false;
};
const initialState = {
  auth: isUserAuthenticated(),
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { auth: true, token: action.token };

    case USER_LOGGED_OUT:
      return initialState;

    default:
      return state;
  }
};
