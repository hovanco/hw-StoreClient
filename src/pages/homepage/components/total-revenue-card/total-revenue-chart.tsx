import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC, memo } from 'react';
import ChartWrap from '../chart-wrap';

interface Props {
    categories: string[];
    values: number[];
}

Highcharts.setOptions({
    lang: {
        thousandsSep: '.',
    }
});

const TotalRevenueChart: FC<Props> = ({ categories, values }) => {
    const options = {
        chart: {
            reflow: true,
        },
        title: {
            text: null,
        },

        subtitle: {
            text: null,
        },

        yAxis: {
            title: {
                text: null,
            },
        },
        colors: ['#0872d7'],

        xAxis: {
            categories,
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                pointStart: 0,
            },
        },

        series: [
            {
                name: 'Doanh thu',
                data: values,
            },
        ],
    };

    return (
        <div style={{ height: '100%', overflow: 'hidden' }}>
            <ChartWrap>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{
                        style: { height: '115%' },
                        className: 'total-revenue-chart',
                    }}
                    allowChartUpdate={true}
                    immutable={true}
                />
            </ChartWrap>
        </div>
    );
};

export default memo(TotalRevenueChart);
