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
            arr[index]=router.query[i];
        }
        str=str+arr[index]+'/';
        hlinks.push(str);
    });
    return (
       <>
           <Breadcrumb separator=">">
               <Breadcrumb.Item><Link href="/"><a><HomeOutlined /></a></Link></Breadcrumb.Item>
               {
                   routes.map((route, index) => {
                       if(route!="")
                        return (
                            <Breadcrumb.Item key={index}><Link href={hlinks[index]}><a>{route.length>10?route.slice(0,6)+'..':route.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase()})}</a></Link></Breadcrumb.Item>
                   )})
               }
           </Breadcrumb>
       </>
    );
};

export default Breadcrumbs;
