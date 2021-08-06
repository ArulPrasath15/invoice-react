import {getSession, signIn, signOut, useSession} from 'next-auth/client'
import {useEffect} from "react";
import axios from "axios";
import Auth from "./auth";
import Router from 'next/router'

export default function Page() {
  // console.log("Axios Defaults",axios.defaults.headers)

  return <>
     <Auth/>
    {/*{!session && <>*/}
    {/*  Not signed in <br/>*/}
    {/*  <button onClick={() => signIn('google')}>Sign in</button>*/}
    {/*</>}*/}
    {/*{session && <>*/}
    {/*  Signed in as {session.user.email} <br/>*/}
    {/*  <button onClick={() => signOut()}>Sign out</button>*/}
    {/*</>}*/}
  </>
}