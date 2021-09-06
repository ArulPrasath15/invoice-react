import React, {useEffect, useState} from 'react';
import axios from "axios";
import Controller from "../hoc/viewController";

function Test(props) {
    const email = "xyz@gmail.com";
    const password = "aaaaaaaa";
    const [token,setToken] = useState('');

    const getToken = async ()=>{
        try{
            const res = await axios.post("/api/auth/login",{email, password});
            const token = res.data?.token;
            setToken(token);
        }catch (e){
            console.log(e);
        }
    }
    const getBusiness = async ()=>{
        try{
            const res = await axios.get("/api/business");
            console.log(res.data);
        }catch (e){
            console.log(e);
        }
    }
    return (
        <div>
            This is my test page
            <br />
            <br />
            <button onClick={()=>{getToken()}}>Get Token</button>

            <br />
            <br />
            <button onClick={()=>{getBusiness()}}>Get Business</button>
            <br />
            <br />
            <button onClick={()=>{setToken('')}}>Clear token</button>
        </div>
    );
}

export default Test;