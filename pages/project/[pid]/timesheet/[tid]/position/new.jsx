/*
* @created: 20/08/2021 - 7:17 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import PositionForm from "../../../../../../components/Timesheet/PositionForm";
import axios from "axios";
import {getSession} from "next-auth/client";

export async function getServerSideProps(props) {
    const {query,req}=props;
    const session=await getSession({req});
    let {pid,tid}=query;
    let res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`,{ headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/project"}}
    res = await axios.get(`${process.env.SERVER_URL}/isValid/timesheet/${tid}`,{ headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: `/project/${pid}`}}
    return {
        props: {}, // will be passed to the page component as props
    }
}

const NewPosition = () => {
    return (
        <div>
            <PositionForm/>
        </div>
    );
};


export default NewPosition;
