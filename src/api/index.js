import axios from "axios";

export default {
    user : {
        login: (credentials) => axios.post('/api/auth', credentials).then(res => res.data.user),
        signup: (data) => axios.post('/api/users', data).then(res => res.data.user),
        // confirm: (token) => axios.post('/api/auth/confirmation', {token}).then(res => res.data.user),
        // resetPasswordRequest: (email) => axios.post('/api/auth/reset_password_request', {email}),
        // resetPassword: (data) => axios.post('/api/auth/reset_password', {data}),
        // validateToken: (token) => axios.post('/api/auth/validate_token', {token}),
    }
}
