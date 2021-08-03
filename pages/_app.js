import React, {useEffect, useState} from "react";
import withReduxStore from '../store/withReduxStore'
import {connect, Provider} from 'react-redux'
import axios from 'axios';
import {Router, useRouter} from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';
import '../assets/css/globals.css'


axios.defaults.baseURL = 'http://localhost:8800';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.common['Content-Type'] = 'application/json';

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });Router.events.on('routeChangeStart', () => {NProgress.start()});Router.events.on('routeChangeComplete', () => {NProgress.done();});Router.events.on('routeChangeError', () => {NProgress.done();});

function _App({ Component, pageProps, reduxStore }) {
    const [auth, setAuth] = useState(false);
    return (
      <>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
  );
}

_App.getInitialProps = async ({Component,ctx}) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps,};
}


export default withReduxStore(_App)
