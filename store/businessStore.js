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
        },
        setDefaultBusiness(state,action){
            state.default_business = action.payload.default;
        },
        resetBusiness(state, action){
            state=undefined;
        }
    }
})

export const { setBusiness, resetBusiness,setDefaultBusiness } = businessSlice.actions

export default businessSlice.reducer