import http from './http';

export default {
    user : {
        login: (credentials) => http.post('/login', credentials).then(res => res.data),
        signup: (data) => http.post('/register', data).then(user => user.data),
    }, 
    clipboard: {
        loadAll: () => http.get('/clipboards').then(res => res.data),
        loadAllLabels: () => http.get('/clipboard-labels').then(res => res.data),
        update: (id, body) => http.patch(`/clipboards/${id}`, body).then(res => res.data),
        remove: (id) => http.delete(`/clipboards/${id}`).then(res => res.data),
        create: (body) => http.post(`/clipboards`, body).then(res => res.data),
        updateItem: (id, itemId, body) => http.patch(`/clipboards/${id}/items/${itemId}`, body).then(res => res.data),
        addItem: (id) => http.post(`/clipboards/${id}/items`).then(res => res.data),
        removeItem: (id, itemId) => http.delete(`/clipboards/${id}/items/${itemId}`).then(res => res.data),
        addLabel: (body) => http.post(`/clipboard-labels`, body).then(res => res.data),
        removeLabel: (id) => http.delete(`/clipboard-labels/${id}`).then(res => res.data),
    }
}
