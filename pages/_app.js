import { wrapper } from '../store/store'
import '../styles/globals.css'
// import 'antd/dist/antd.css';

const WrappedApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
