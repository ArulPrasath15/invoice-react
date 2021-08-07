/*
* @created: 07/08/2021 - 1:22 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import TimesheetForm from "../../components/Timesheet/TimesheetForm";
import Head from "next/head";

const NewTimeSheet = () => {
    return (
        <>
            <Head>
                <title>New Timesheet | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TimesheetForm/>
        </>

    );
};

export default NewTimeSheet;
