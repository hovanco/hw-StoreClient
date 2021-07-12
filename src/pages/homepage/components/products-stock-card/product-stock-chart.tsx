import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC } from 'react';

interface Props {}

const ProductStockChart: FC<Props> = () => {
    const options = {
        chart: {
            backgroundColor: null,
            type: 'pie',
        },
        title: {
            text: null,
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: ['#fff', '#f9d21a'],
                dataLabels: {
                    enabled: true,
                    format: '',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4,
                    },
                },
            },
        },

        series: [
            {
                name: '',
                data: [
                    { name: '', y: 11.84 },
                    { name: '', y: 61.41 },
                ],
            },
        ],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{
                style: { height: '100%' },
                className: 'products-stock-chart',
            }}
        />
    );
};

export default ProductStockChart;
