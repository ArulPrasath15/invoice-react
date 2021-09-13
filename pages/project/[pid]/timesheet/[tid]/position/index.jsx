/*
* @created: 13/09/2021 - 9:27 PM
* @author: Abi
* @description: ----------------
*/

import React from 'react';

export async function getServerSideProps({query}) {
    let {pid}=query;
    return {redirect: {permanent: false, destination: `/project/${pid}`}}
}

const RedirectPosition = () => {
    return (
        <></>
    );
};

export default RedirectPosition;