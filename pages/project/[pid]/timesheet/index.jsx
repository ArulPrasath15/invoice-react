/*
* @created: 13/09/2021 - 9:25 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';

export async function getServerSideProps({query}) {
    let {pid}=query;
    return {redirect: {permanent: false, destination: `/project/${pid}`}}
}

const RedirectTimesheet = () => {
    return (
        <></>
    );
};

export default RedirectTimesheet;

