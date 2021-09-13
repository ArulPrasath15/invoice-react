/*
* @created: 13/09/2021 - 7:57 PM
* @author: Abi
* @description: ----------------
*/
import axios from "axios";

const getCurrency = async () => {
    const res=await axios.get(`${process.env.SERVER_URL}/currency`);
    return res.data?.currencies;
}

export default getCurrency;