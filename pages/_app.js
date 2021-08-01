import React from "react";
import NextApp from "next/app";
import withReduxStore from '../store/withReduxStore'
import { Provider } from 'react-redux'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8800';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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