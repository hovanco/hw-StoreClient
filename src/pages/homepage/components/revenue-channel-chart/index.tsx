import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC, memo } from 'react';
import ChartWrap from '../chart-wrap';

interface Props {
    color?: string;
    categories: string[];
    values: number[];
}

const RevenueChannelChart: FC<Props> = ({ color = '#6c6fbf', values, categories }) => {
    const renderChart = () => {
        const options = {
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: {
                categories,
            },
            yAxis: { title: { text: '' } },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'column',
                    data: values,
                },
            ],
            chart: {
                height: 250,
            },

            colors: [color],

            plotOptions: {
                column: {
                    borderRadius: 5,
                    pointWidth: 10,
                },
            },
        };

        return (
            <ChartWrap>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{
                        style: { height: '250px' },
                    }}
                />
            </ChartWrap>
        );
    };

    return <div style={{ height: 200, overflow: 'hidden' }}>{renderChart()}</div>;
};

export default memo(RevenueChannelChart);
