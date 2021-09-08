import React, {useState} from 'react'
import {Button, Typography, Col, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Head from "next/head";
import {useRouter} from "next/router";
import TimesheetList from "../../../components/Timesheet/TimesheetList";
import Breadcrumbs from "../../../components/Utils/Breadcrumb";
import EmptyContainer from "../../../components/Utils/EmptyContainer";
import {TitleStrip} from "../../../components/Utils/TitleStrip";
const { Title } = Typography;

function Timesheet() {
    const router = useRouter();
    const [isEmpty, setIsEmpty] = useState(false);
    return (
        <>
        <Head>
            <title>Timesheet | Penta Invoice</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className='mt-5 mx-5'>
           <TitleStrip head={{title: "Timesheets", desc: "Add new timesheets and store all timesheet related information", action:"Add Timesheet", action_link:`${router.asPath}/timesheet/new`}}/>
        </div>
        {
            isEmpty && <div className='mt-5 mx-5'>
                <EmptyContainer/>
             </div>
        }
        {
            !isEmpty && <TimesheetList/>
        }
        </>
    )
}

export default Timesheet
