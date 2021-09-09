/*
* @created: 08/09/2021 - 9:38 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Button, Result} from "antd";

const Page404 = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    );
};

export default Page404;
