/*
* @created: 16/08/2021 - 7:30 PM
* @author: Abi
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    auth: false,
    user:{}
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            console.log(action.payload);
            state.auth=action.payload.auth;
            state.user=action.payload.user;
        },
        logout(state, action) {
            state=initialState
        },
        resetStore(state, action){
            state=initialState
        }
    }
})

export const { login, logout, resetStore } = authSlice.actions

export default authSlice.reducer