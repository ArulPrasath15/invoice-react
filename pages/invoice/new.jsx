import React from 'react';
import Head from "next/head";
import Template1 from "../../components/Templates/template-1";

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let data=[];
    await countries.forEach(country=>{
        if(country.alpha3Code!=null && country.currencies?.[0]?.code!=null && country.currencies[0].symbol)
            data.push({
                code: country.alpha3Code,
                currency: country.currencies[0].code,
                symbol: country.currencies[0].symbol
            });
    });
    return {
        props: {data}, // will be passed to the page component as props
    }
}
function Index({data}) {
    return (
        <>
            <Head>
                <title>New Invoice | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Template1 currencyList={data}/>
        </>

    );
}



export default Index;