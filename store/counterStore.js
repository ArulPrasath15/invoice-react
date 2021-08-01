/*
* @created: 31/07/2021 - 8:50 PM
* @author: Abi
* @description: ----------------
*/
const countInitialState = {
    count: 0,
}
const countActionTypes = {
    ADD: 'ADD',
}
const addCount = () => (dispatch) => {
    return dispatch({ type: countActionTypes.ADD })
}

function reducer(state = countInitialState, action) {
    switch (action.type) {
        case countActionTypes.ADD:
            return Object.assign({}, state, {
                count: state.count + 1,
            })
        default:
            return state
    }
}
export default reducer;