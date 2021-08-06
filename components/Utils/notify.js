import { notification } from 'antd';

const notify = ({type='info',msg='', des=''}) => {
    notification[type]({
        message: msg,
        description: des,
        placement: 'topRight',
        duration: 2.5,
    });
    return true;
};

export default notify;
