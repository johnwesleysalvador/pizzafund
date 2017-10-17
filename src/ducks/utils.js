export const createAction = (type, ...props) => {
    return (...prop) => {
        let action = {type}
        props.forEach((arg, index) => {
            action[props[index]] = prop[index]
        })
        return action
    }
}

export const createReducer = (initState, reducerHandlers) => {
    return (state = initState, action) => {
        if (reducerHandlers[action.type]) {
            return reducerHandlers[action.type](state, action)
        }
        return state
    }
}
