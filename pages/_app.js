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


NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });Router.events.on('routeChangeStart', () => {NProgress.start()});Router.events.on('routeChangeComplete', () => {NProgress.done();});Router.events.on('routeChangeError', () => {NProgress.done();});



function _App({ Component, pageProps, reduxStore }) {
    const [authToken, setAuthToken] = useState('');
    const [loader , setLoader] = useState(true);
    axios.defaults.baseURL = 'http://localhost:8800';
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';


    useEffect(() => {
        getSession().then((session,loading) => {

            setLoader(true)
            if (session) {
                setAuthToken(session.user.token);
                setLoader(false);
                console.log("Index Session",session)
            } else {
                // if(!Router.query.autherror) {Router.push('/auth')}
                setLoader(false);
            }
        });
    }, []);
    const router = useRouter()
    const [auth, setAuth] = useState(false);
    const hideList=['/','/auth','/new']

    return (
      <>
          <Provider store={reduxStore} session={pageProps.session}>
              {loader &&
              <Row align={'middle'} className={'h-100'}>
                  <Col offset={12}>
                      <Spin></Spin>
                  </Col>
              </Row>
              }
            { (!hideList.includes(router.pathname) && !loader) && <NavLayout pathname={router.pathname.substring(1)}><Component {...pageProps} /></NavLayout> }
            { (hideList.includes(router.pathname) && !loader) && <Component {...pageProps} /> }
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
