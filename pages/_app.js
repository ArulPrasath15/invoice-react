import React from "react";
import NextApp from "next/app";
import withReduxStore from '../store/withReduxStore'
import { Provider } from 'react-redux'
import axios from 'axios';
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../assets/css/globals.css'

axios.defaults.baseURL = 'http://localhost:8800';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });
Router.events.on('routeChangeStart', () => {
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});


class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
    );
  }
}

export default withReduxStore(App)