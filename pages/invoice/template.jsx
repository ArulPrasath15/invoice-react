import React from 'react';
import Head from "next/head";
import Template1 from "../../components/Templates/template-1";

function Template(props) {


    return (
        <>
            <Head>
                <title>New Invoice | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Template1/>
        </>

    );
}



export default Template;