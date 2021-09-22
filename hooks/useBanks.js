import axios from "axios";
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';

const useBanks = () => {
    const [data, setData] = useState([]);
    const default_business = useSelector(state => state.businessStore.default_business);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/bank`);
                if (res.status === 200) {
                    if (res.data.bank)
                        setData(res.data.bank);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, [default_business._id]);
    return {data}
}

export default useBanks;
