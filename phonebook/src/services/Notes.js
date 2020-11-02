import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data)
}

const create = (newNote) => {
    return axios.post(baseUrl, newNote)
                .then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(response => response.data)
}

const update = (id, note) => {
    return axios.put(`${baseUrl}/${id}`, note)
                .then(response => response.data)
} 


export default { getAll, create, remove, update }