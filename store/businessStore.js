/*
* @created: 16/08/2021 - 7:29 PM
* @author: Abi
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    business:[],
    default_business:0,
}

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setBusiness(state, action) {
           state.business = action.payload.business;
           state.default_business = action.payload.default;
        },
        resetStore(state, action){
            state=initialState
        }
    }
})

export const { setBusiness, resetStore } = businessSlice.actions

export default businessSlice.reducer