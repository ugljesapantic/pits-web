import axios from "axios";

import auth0 from 'auth0-js';

let webAuth = new auth0.WebAuth({
    domain: 'ugljesapantic.auth0.com',
    clientID: '481Ce2SzsvQFck8N4bmFaA7cS5O8ml8n',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid', 
});

export default {
    user : {
        login: (credentials) => axios.post('/api/auth', credentials).then(res => res.data.user),
        // signup: (data) => axios.post('/api/users', data).then(res => res.data.user),
        // confirm: (token) => axios.post('/api/auth/confirmation', {token}).then(res => res.data.user),
        // resetPasswordRequest: (email) => axios.post('/api/auth/reset_password_request', {email}),
        // resetPassword: (data) => axios.post('/api/auth/reset_password', {data}),
        // validateToken: (token) => axios.post('/api/auth/validate_token', {token}),
        signup: (data) => new Promise((resolve, reject) => {
            webAuth.signup({
                ...data,
                connection: 'Username-Password-Authentication', 
                }, (r) => r.statusCode === 200 ? resolve(r) : reject(r.description));
        })
    }
}
