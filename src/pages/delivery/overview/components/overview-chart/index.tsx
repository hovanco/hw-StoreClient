import './style.less';

import React, { FC, memo } from 'react';

import { Card } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsStock from 'highcharts/modules/stock';

highchartsStock(Highcharts);
type Props = {};

const OverviewChart: FC<Props> = memo(() => {
    const options = {
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        yAxis: {
            title: { text: '' },
            labels: {
                formatter: function (value: any) {
                    return value.value + '%';
                },
            },
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [0, 10, 25, 50, 20, 25, 25, 50, 20, 25, 25, 50],
            },
        ],
    };
    return (
        <Card
            title="Chỉ số giao hàng thành công"
            type="inner"
            bordered={false}
            bodyStyle={{ padding: 0 }}
            className="card-custom report-chart"
        >
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Card>
    );
});
export { OverviewChart };
