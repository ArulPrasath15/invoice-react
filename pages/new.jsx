import React from 'react';
import BusinessForm from '../components/Settings/BusinessForm'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../assets/css/Auth.module.css';
import {Row, Col, Card, Space, Button} from 'antd';
import logoImg from '../assets/images/logo.png'
import VectorImg from '../assets/images/authVector.png'
import bg from '../assets/images/authBG.jpg'
import Image from 'next/image'
import AuthRoute from '../hoc/auth.hoc'

export async function getServerSideProps(context) {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let countryData=[];
    await countries.forEach(country=>{
        if(country.name && country.callingCodes[0] )
            countryData.push({
                countryName: country.name,
                countryCallingCodes: country.callingCodes[0],
                countryCode: country.alpha3Code,
            });
    });
    return {
        props: {countryData},
    }
}

function New({countryData}) {
    return (
        <>
            <Head>
                <title>Pentafox | New Business</title>
                <meta name="vieport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Row>
                <Col xs={0} lg={12} className={styles.authBgImg}>
                </Col>
                <Col xs={24} lg={12} style={{paddingLeft:"7vw",paddingRight:"7vw"}}>

                    <div className={'mt-3'}>
                        <Space>
                            <h1 className={'text-secondary'}>Add Business</h1>
                        </Space>
                    </div>
                    <BusinessForm countryData={countryData} />
                </Col>
            </Row>
        </>
    );
}

export default AuthRoute(New);