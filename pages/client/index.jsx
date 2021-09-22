import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ClientCard from "../../components/Client/ClientCard";
import BreadCrumbs from '../../components/Utils/Breadcrumb'
import {Button, Typography, Col, Row, Empty, Drawer, Skeleton} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import useClients from "../../hooks/useClients";
import {TitleStrip} from "../../components/Utils/TitleStrip";
import EmptyContainer from "../../components/Utils/EmptyContainer";
import ClientEdit from "../../components/Client/ClientEdit";
import ClientForm from "../../components/Client/ClientForm";
const { Title, Text } = Typography;

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let data=[];
    await countries.forEach(country=>{
        if(country.alpha3Code!=null && country.callingCodes[0] !=null && country.name != null)
            data.push({
                code: country.alpha3Code,
                callingCode: country.callingCodes[0],
                name:country.name
            });
    });
    return {
        props: {data},
    }
}

function Client(props) {
    // const [clients,setClients] = useState([]);
    const {data} = props
    const [number, setNumber] = useState([1,2,3,4]);
    const [loader, setLoader] = useState(true);
    const {data: clients,clientLoader:clientLoader} =  useClients();
    const [edit,setEdit] = useState(false);
    const toggleEdit = ()=>{
        setEdit(!edit);
    }
    useEffect(() => {
        return () => {
            setLoader(false)
        };
    }, [clients]);

    return (
        <>
            <Head>
                <title>Client | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleStrip head={{title: "My Clients", desc: "Add new clients and store all client related information in client profiles", action:"Add Client", action_link:"/client/new",trigger:toggleEdit,type:"trigger"}}/>
            <div className='mx-5 mt-5 mb-5'>

                {/*loader*/}
                { loader &&
                <div className={"mx-5 my-5"}>
                    <Row  justify='space-between'>
                        {number.map(client=>{
                            return (
                                <Col  span={11} key={client._id} className="mt-5">
                                    <Skeleton avatar paragraph={{ rows: 3 }} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
                }

                {clients.length === 0 && loader===false &&
                <Row justify='center' align="middle"  style={{minHeight: '60vh'}}>
                    <EmptyContainer header={"Add New Client"} />
                </Row>
                }

                {clients.length > 0 && loader===false &&
                <Row  justify='space-between'>
                     {clients.map(client=>{
                         return (
                             <Col span={11} key={client._id} className="mt-5">
                                 <Link href={`/client/${client._id}`}>
                                     <a>
                                         <ClientCard client={client}/>
                                     </a>
                                 </Link>
                             </Col>
                         )
                     })}
                </Row>
                }

            </div>
            <Drawer title="Add new Client" width={720} visible={edit} closable={true} onClose={()=>setEdit(false)} bodyStyle={{ paddingBottom: 20 }} >
                <ClientForm data={data} setEdit={setEdit} />
            </Drawer>
        </>
    )
}


export default Client;
