/*
* @created: 24/08/2021 - 10:57 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import { Breadcrumb } from 'antd';
import {useRouter} from "next/router";
import {HomeOutlined} from "@ant-design/icons";

const Breadcrumbs = () => {
    const router = useRouter();
    let routes= router.route.split('/');
    routes.forEach((i,index,arr)=>{
        if(i.charAt(0)=='[')
        {

            i=i.slice(1);
            i=i.slice(0, i.length - 1);
            console.log(i)
            arr[index]=router.query[i];
        }
    })
    console.log(router.query.id)
    return (
       <>
           <Breadcrumb separator=">">
               <Breadcrumb.Item href="">
                   <HomeOutlined />
               </Breadcrumb.Item>
               {
                   routes.map((route, index) => (
                       <Breadcrumb.Item key={index} style={{textTransform: 'capitalize'}}>{route}</Breadcrumb.Item>
                   ))
               }
           </Breadcrumb>
       </>
    );
};

export default Breadcrumbs;
