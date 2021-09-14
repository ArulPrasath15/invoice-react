import {useCallback, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import {getSession} from "next-auth/client";
import {connect} from 'react-redux'
import {setUser} from '../store/userStore'
import {setBusiness,setDefaultBusiness} from '../store/businessStore'
import Head from "next/head";
import axios from "axios";
import DashboardComponent from '../components/Dashboard/Dashboard'

 function Dashboard({ setUser, setBusiness,setDefaultBusiness,default_business}) {
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
                         res = await axios.get('/business');
                         await setBusiness({business:res.data.business});
                         if(!default_business)
                            await setDefaultBusiness({default:res.data.business[0]})
                     }
                     catch (e) {
                         console.error(e);
                     }
                 })();
             }
         });
     }, []);

     return (
        <>
            <Head>
                <title>Pentafox | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DashboardComponent />
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.userStore.auth,
    user: state.userStore.user,
    business: state.businessStore.business,
    default_business:state.businessStore.default_business
})

const mapDispatchToProps = { setUser, setBusiness,setDefaultBusiness }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
