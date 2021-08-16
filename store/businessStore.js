/*
* @created: 16/08/2021 - 7:29 PM
* @author: Abi
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    user_id:'',
    business_name:'',
    gstin: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
}

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setBusiness(state, action) {
           state=action.payload;
        },
        resetStore(state, action){
            state=initialState
        }
    }
})

export const { setBusiness, resetStore } = businessSlice.actions

export default businessSlice.reducer