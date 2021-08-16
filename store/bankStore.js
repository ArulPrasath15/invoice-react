/*
* @created: 16/08/2021 - 7:30 PM
* @author: Abi
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    user_id:'',
    business_id:'',
    bank_id:'',
    acc_number: '',
    acc_type: '',
    bank_name: '',
    ifsc: '',
    branch: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    micr: '',
    swift: '',
    category: '',
}

const bankSlice = createSlice({
    name: 'bank',
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

export const { login, logout, resetStore } = bankSlice.actions

export default bankSlice.reducer