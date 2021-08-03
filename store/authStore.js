/*
* @created: 03/08/2021 - 2:32 PM
* @author: Abi
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    auth: false,
    token: ''
}

const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        login(state, action) {
            console.log(action.payload);
            state.auth=action.payload.auth;
            state.token=action.payload.token;
        },
        logout(state, action) {
            state=initialState
        },
        resetStore(state, action){
            state=initialState
        }
    }
})

export const { login } = authSlice.actions

export default authSlice.reducer