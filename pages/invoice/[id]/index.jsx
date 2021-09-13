import React from 'react';
import Head from "next/head";
import Template1 from "../../../components/Templates/template-1";
import getCurrency from "../../../hooks/getCurrency";


export async function getServerSideProps() {
    const data=await getCurrency();
    return {
        props: {data}, // will be passed to the page component as props
    }
}
function Index({data}) {
    return (
        <>
            <Head>
                <title>Invoice | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Template1 currencyList={data}/>
        </>

    );
}

export default Index;