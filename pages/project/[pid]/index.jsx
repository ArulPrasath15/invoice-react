import React from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import TimesheetList from "../../../components/Timesheet/TimesheetList";
import {TitleStrip} from "../../../components/Utils/TitleStrip";

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

function Timesheet({data}) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Timesheet | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleStrip head={{title: "Timesheets", desc: "Add new timesheets and store all timesheet related information", action:"Add Timesheet", action_link:`${router.asPath}/timesheet/new`}}/>
            <TimesheetList data={data}/>
        </>
    )
}

export default Timesheet;
