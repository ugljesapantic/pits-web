import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = token => ({
    type: USER_LOGGED_IN,
    token,
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
})

export const login = credentials => dispatch => api.user.login(credentials).then(user => {
    localStorage.pitsJWT = user.token;
    dispatch(userLoggedIn(user.token));
})

export const logout = () => dispatch => {
    localStorage.removeItem('pitsJWT');
    dispatch(userLoggedOut());
}

export const confirm = token => dispatch => api.user.confirm(token).then(user => {
    localStorage.pitsJWT = user.token;
    dispatch(userLoggedIn(user.token));
})

export const resetPasswordRequest = ({email}) => () => api.user.resetPasswordRequest(email);

export const validateToken = (token) => () => api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);

export const signup = credentials => dispatch => api.user.signup(credentials).then(user => {
    localStorage.pitsJWT = user.token;
    dispatch(userLoggedIn(user.token));
})


