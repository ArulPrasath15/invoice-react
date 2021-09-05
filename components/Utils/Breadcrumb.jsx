/*
* @created: 24/08/2021 - 10:57 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import { Breadcrumb } from 'antd';
import {useRouter} from "next/router";
import {HomeOutlined} from "@ant-design/icons";
import Link from 'next/link';

const Breadcrumbs = () => {
    const router = useRouter();
    let routes= router.route.split('/');
    let str='';
    let hlinks=[];
    routes.forEach((i,index,arr)=>{
        if(i.charAt(0)=='[')
        {
            i=i.slice(1);
            i=i.slice(0, i.length - 1);
            console.log(i)
            arr[index]=router.query[i];
        }
        str=str+arr[index]+'/';
        hlinks.push(str);
    });
    console.log(hlinks);
    console.log(routes);
    console.log(router.query.id)
    return (
       <>
           <Breadcrumb separator=">">
               <Breadcrumb.Item href="/"><HomeOutlined /></Breadcrumb.Item>
               {
                   routes.map((route, index) => (
                       <Breadcrumb.Item key={index}  href={hlinks[index]} style={{textTransform: 'capitalize'}}>{route.length>10?route.slice(0,6)+'..':route}</Breadcrumb.Item>
                   ))
               }
           </Breadcrumb>
       </>
    );
};

export default Breadcrumbs;
