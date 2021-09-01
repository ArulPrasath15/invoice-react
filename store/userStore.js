/*
* @created: 03/08/2021 - 2:32 PM
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
        setUser(state, action) {
            console.log(action.payload);
            state.auth=action.payload.auth;
            state.user=action.payload.user;
        },
        resetStore(state, action){
            state=initialState
        }
    }
})

export const { setUser, resetStore } = authSlice.actions

export default authSlice.reducer