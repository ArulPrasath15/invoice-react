import React from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import TimesheetList from "../../../components/Timesheet/TimesheetList";
import EmptyContainer from "../../../components/Utils/EmptyContainer";
import {TitleStrip} from "../../../components/Utils/TitleStrip";

function Timesheet() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Timesheet | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
               <TitleStrip head={{title: "Timesheets", desc: "Add new timesheets and store all timesheet related information", action:"Add Timesheet", action_link:`${router.asPath}/timesheet/new`}}/>
            </div>
            <TimesheetList/>
        </>
    )
}

export default Timesheet;
