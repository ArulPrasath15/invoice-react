import React, {useEffect, useState} from "react";
import withReduxStore from '../store/withReduxStore'
import {connect, Provider} from 'react-redux'
import axios from 'axios';
import { useRouter} from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';
import '../assets/css/globals.css'
import '../assets/css/color.css'
import NavLayout from "../components/Layout/NavLayout";
import {getSession} from "next-auth/client";
import Router from 'next/router'
import {Spin, Row, Col} from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Private from "./private";

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });Router.events.on('routeChangeStart', () => {NProgress.start()});Router.events.on('routeChangeComplete', () => {NProgress.done();});Router.events.on('routeChangeError', () => {NProgress.done();});

function _App({ Component, pageProps, reduxStore }) {

    const [auth,setAuth] = useState(false);

    const persistor = persistStore(reduxStore);
    // useEffect(()=>{
    //     (async ()=>{
    //         try{
    //             const res = await axios.get('/api/business');
    //             if(res?.status === 200){
    //                 setAuth(true);
    //             }else{
    //                 setAuth(false);
    //             }
    //         }catch (e) {
    //             setAuth(false);
    //         }
    //
    //     })();
    //
    // },[auth])
    return (
      <>
          <Provider store={reduxStore} session={pageProps.session}>
              <PersistGate loading={null} persistor={persistor}>
                  <Component {...pageProps} />
              </PersistGate>
          </Provider>
      </>
  );
}

_App.getServerSideProps = async ({Component,ctx}) => {
  let pageProps = {};
  if (Component.getServerSideProps) {
    pageProps = await Component.getServerSideProps(ctx);
  }
  return {pageProps,};
}


export default withReduxStore(_App)
