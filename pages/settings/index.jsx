/*
* @created: 06/08/2021 - 9:56 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Tabs} from "antd";
import {General} from "../../components/Settings/General";
import {Accounting} from "../../components/Settings/Accounting";
import Head from "next/head";
const { TabPane } = Tabs;
const Settings = () => {
    return (
        <>
        <Head>
            <title>Settings | Penta Invoice</title>
        </Head>
        <div className="mx-5 mt-5">
            <div className="card-container">
                <Tabs type="card" size='large' >
                    <TabPane tab="General" key="1">
                        <General/>
                    </TabPane>
                    <TabPane tab="Accounting"  key="2">
                        <Accounting/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        </>
    );
};

export default Settings;