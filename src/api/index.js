import axios from 'axios';


export default {
    // TODO, generic, non hardcoded
    user : {
        login: (credentials) => axios.post('http://localhost:3000/login', credentials).then(res => res.data),
        signup: (data) => axios.post('http://localhost:3000/register', data).then(user => user.data),
        confirm: (token) => axios.post('localhost:3000/auth/confirmation', {token}).then(res => res.data.user),
        resetPasswordRequest: (email) => axios.post('localhost:3000/auth/reset_password_request', {email}),
        resetPassword: (data) => axios.post('localhost:3000/auth/reset_password', {data}),
        validateToken: (token) => axios.post('localhost:3000/auth/validate_token', {token}),
    }
}
