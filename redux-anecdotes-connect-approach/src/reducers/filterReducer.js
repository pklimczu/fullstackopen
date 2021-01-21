const reducer = (state = "", action) => {
    switch (action.type) {
        case "FILTER_CHANGED":
            return action.data
        default:
            return state
    }
}

export const changeFilter = (filterString) => {
    return {
        type: "FILTER_CHANGED",
        data: filterString
    }
}

export default reducer