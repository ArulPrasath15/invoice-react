import React from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import TimesheetList from "../../../components/Timesheet/TimesheetList";
import {TitleStrip} from "../../../components/Utils/TitleStrip";
import axios from "axios";
import getCurrency from "../../../hooks/getCurrency";
import { getSession } from "next-auth/client"
import {connect, useSelector} from "react-redux";

export async function getServerSideProps(props) {
    const data=await getCurrency();
    const {req,query,ctx}=props;
    console.log(ctx);
    const session=await getSession({req});
    let {pid}=query;
    const res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`, { headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    if(!res.data.isValid)
    {
        return {redirect: {permanent: false, destination: "/project"}}
    }
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

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(Timesheet);
