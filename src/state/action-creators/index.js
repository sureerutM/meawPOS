export const addMenu = (amount) => {
    return (dispatch) => {
        dispatch({
            type: 'add',
            payload: amount
        })
    }
}

export const deleteMenu = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'delete',
            payload: id
        })
    }
}

export const clearAll = () => {
    return (dispatch) => {
        dispatch({
            type: 'clearAll',
            payload: null
        })
    }
}