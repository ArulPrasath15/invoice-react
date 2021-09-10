/*
* @created: 02/09/2021 - 6:39 PM
* @author: Abi
* @description: ----------------
*/
import React, {useState} from 'react'
import {Button, Typography, Col, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Head from "next/head";
import {useRouter} from "next/router";
import ProjectList from "../../components/Timesheet/ProjectList";
import Breadcrumbs from "../../components/Utils/Breadcrumb";
import EmptyContainer from "../../components/Utils/EmptyContainer";
import {TitleStrip} from "../../components/Utils/TitleStrip";
const { Title, Text } = Typography;

function Project() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Projects | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleStrip head={{title: "Projects", desc: "Add new projects and store all project related information", action:"Add Project", action_link:`/project/new`}}/>
            <ProjectList/>
        </>
    )
}

export default Project;
