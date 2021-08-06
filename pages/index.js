import {getSession, signIn, signOut, useSession} from 'next-auth/client'
import {useEffect} from "react";
import axios from "axios";

export default function Page() {
  const [ session, loading ] = useSession()
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn('facebook')}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      {console.log(session.user)}
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}