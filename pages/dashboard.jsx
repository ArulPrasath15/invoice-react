import {useCallback, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import {getSession} from "next-auth/client";
import Head from "next/head";

 function Dashboard() {
     const router = useRouter()
     const [username, setUsername] = useState('');
     useEffect(() => {
         getSession().then((session) => {
             if (session) {
                 setUsername(session.user.name);
             }
         });
     }, []);

     return (
        <div>
            <Head>
                <title>Pentafox | Dashboard</title>
                <meta name="vieport" content="initial-scale=1.0, width=device-width" />
            </Head>
                <h1 align={"center"} style={{paddingTop:'40vh'}}>Hello {username} !!</h1>
                <h1 align={"center"} >Dashboard</h1>
        </div>
    );
}

export default Dashboard