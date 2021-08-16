import {useCallback, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import {getSession} from "next-auth/client";
import {connect} from 'react-redux'
import {setUser} from '../store/userStore'
import {setBusiness} from '../store/businessStore'
import Head from "next/head";
import axios from "axios";

// ToDo: Get Business details and settings and store them in store
 function Dashboard({ setUser, setBusiness }) {
     const router = useRouter()
     const [username, setUsername] = useState('');
     useEffect(() => {
         getSession().then((session) => {
             if (session) {
                 console.log(session.user);
                 let id=session.user.user.id;
                 (async () => {
                     try{
                         let res=await axios('auth/getUser/'+id)
                         await setUser({auth: true, user: res.data.user});
                         console.log("23",res.data.user);
                     }
                     catch (e) {
                         console.error(e);
                     }
                 })();
             }
         });
     }, []);

     return (
        <div>
            <Head>
                <title>Pentafox | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
                <h1 align={"center"} style={{paddingTop:'40vh'}}>Hello {username} !!</h1>
                <h1 align={"center"} >Dashboard</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.userStore.auth,
    user: state.userStore.user,
    business: state.businessStore,
})

const mapDispatchToProps = { setUser, setBusiness }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
