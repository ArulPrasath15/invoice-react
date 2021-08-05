import {getSession, signIn, signOut, useSession} from 'next-auth/client'
import {useEffect} from "react";
import axios from "axios";

export default function Page() {
  // console.log("Axios Defaults",axios.defaults.headers)
  const [ session, loading ] = useSession()
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       console.log("Index Session",session)
  //     } else {
  //       console.log(false);
  //     }
  //   });
  // }, []);
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}