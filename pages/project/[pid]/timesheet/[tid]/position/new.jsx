/*
* @created: 20/08/2021 - 7:17 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import PositionForm from "../../../../../../components/Timesheet/PositionForm";
import axios from "axios";

export async function getServerSideProps({query}) {

    let {pid,tid}=query;
    let res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`)
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/404"}}
    res = await axios.get(`${process.env.SERVER_URL}/isValid/timesheet/${tid}`)
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/404"}}
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
