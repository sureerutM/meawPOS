const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "add":
            {
            return [...state, action.payload]
            }
        case "delete":
            {
                return state.filter((item) => {
                    return item.id !== action.payload
                })
            }
        case "clearAll":
            {
                return []
            }

        default: {
            return state
        }
    }
}

export default reducer