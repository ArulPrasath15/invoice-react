import axios from "axios";
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';

const useClients = () => {
    const [data, setData] = useState([]);
    const default_business = useSelector(state => state.businessStore.default_business);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/client/${default_business._id}`);
                if (res.status == 200) {
                    if (res.data.clients)
                        setData(res.data.clients);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, [default_business._id]);
    return {data}
}

export default useClients;
