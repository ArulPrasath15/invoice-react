import React from 'react';
import { Column } from '@ant-design/charts';

function Activity(props) {
        const data = [
            {
                type: 'Mon',
                sales: 38,
            },
            {
                type: 'Tue',
                sales: 52,
            },
            {
                type: 'Wed',
                sales: 61,
            },
            {
                type: 'Thu',
                sales: 145,
            },
            {
                type: 'Fri',
                sales: 48,
            },
        ];
        const config = {
            data: data,
            xField: 'type',
            yField: 'sales',
            columnWidthRatio: 0.8,
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                type: { alias: '类别' },
                sales: { alias: '销售额' },
            },
        };
        return <Column {...config} />;
}

export default Activity;