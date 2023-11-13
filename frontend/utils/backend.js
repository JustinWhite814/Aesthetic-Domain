import axios from 'axios';

// const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }

export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

export async function getComments(artworkId, customAuthHeader) {
    const { data } = await axios.get(`/api/comments/${artworkId}`, customAuthHeader)
    return data
}

export async function postComment(comment, customAuthHeader) {
    const { data } = await axios.post('/api/comments', comment, customAuthHeader)
    return data
}

export async function updateComment(comment, id, customAuthHeader) {
    const { data } = await axios.put(`/api/comments/${id}`, comment, customAuthHeader)
    return data
}

export async function deleteComment(id, customAuthHeader) {
    const { data } = await axios.delete(`/api/comments/${id}`, customAuthHeader)
    return data
}