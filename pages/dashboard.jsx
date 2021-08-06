import {useCallback, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import {getSession} from "next-auth/client";

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
                <h1 align={"center"} style={{paddingTop:'40vh'}}>Hello {username} !!</h1>
                <h1 align={"center"} >Dashboard</h1>
        </div>
    );
}

export default Dashboard