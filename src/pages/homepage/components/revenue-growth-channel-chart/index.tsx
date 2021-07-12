import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC } from 'react';

interface Props {
    color?: string;
}

const RevenueGrowthChart: FC<Props> = ({ color = '#0872d7' }) => {
    const options = {
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

        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                pointStart: 0,
            },
        },

        colors: [color],

        series: [
            {
                name: null,
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111, 12, 3213, 3123, 18111],
            },
        ],
    };

    return (
        <div style={{ height: 200, overflow: 'hidden' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{
                    style: { height: '250px' },
                    className: 'total-revenue-chart',
                }}
            />
        </div>
    );
};

export default RevenueGrowthChart;
