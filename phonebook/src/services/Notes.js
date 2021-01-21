import { useResource } from '../hooks/index'

export const NoteService = () => {
    const baseUrl = '/api/persons'

    const resource = useResource(baseUrl)

    return {
        getAll: resource.getAll,
        create: resource.create,
        remove: resource.remove,
        update: resource.update
    }
}
