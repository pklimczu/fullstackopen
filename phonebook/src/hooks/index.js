import axios from 'axios'

export const useResource = (baseUrl) => {
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

    return {
        getAll,
        create,
        remove,
        update
    }
}