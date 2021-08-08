/*
* @created: 06/08/2021 - 9:56 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Tabs} from "antd";
import General from "../../components/Settings/General";
import Accounting from "../../components/Settings/Accounting";
import Head from "next/head";
const { TabPane } = Tabs;

export async function getServerSideProps(context) {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let data=[];
    await countries.forEach(country=>{
        if(country.name && country.callingCodes[0] )
            data.push({
                countryName: country.name,
                countryCallingCodes: country.callingCodes[0],
                countryCode: country.alpha3Code,
            });
    });
    return {
        props: {data}, // will be passed to the page component as props
    }
}


const Settings = ({data}) => {
    return (
        <>
        <Head>
            <title>Settings | Penta Invoice</title>
        </Head>
        <div className="mx-5 mt-5">
            <div className="card-container">
                <Tabs type="card" size='large' >
                    <TabPane tab="General" key="1">
                        <General countryData={data}/>
                    </TabPane>
                    <TabPane tab="Accounting" key="2">
                        <Accounting countryData={data}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        </>
    );
};

export default Settings;