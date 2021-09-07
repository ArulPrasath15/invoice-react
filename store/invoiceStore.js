/*
* @created: 02/09/2021 - 7:30 PM
* @author: Ajay
* @description: ----------------
*/
import {createSlice} from '@reduxjs/toolkit'

let initialState = {

    igst:"0",
    sgst:"0",
    cgst:"0",
    itax:"",
    stax:"",
    ctax:"",
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setIGST(state, action) {
            state.igst = action.payload.igst;
        },
        setSGST(state, action) {
            state.sgst = action.payload.sgst;
        },
        setCGST(state, action) {
            state.cgst = action.payload.cgst;
        },
        setITax(state, action){
            state.itax=action.payload.t;
        },
        setSTax(state, action){
            state.stax=action.payload.t;
        },
        setCTax(state, action){
            state.ctax=action.payload.t;
        },
        resetInvoice(state, action){
                state.igst="0";
                state.sgst="0";
                state.cgst="0";
                state.itax="";
                state.stax="";
                state.ctax="";
                state.tableData=[];
                state.total="";
            console.log(action.payload.reset)
        }
    }
})

export const { setCGST,setIGST,setSGST,setITax,setCTax,setSTax, resetInvoice } = invoiceSlice.actions

export default invoiceSlice.reducer