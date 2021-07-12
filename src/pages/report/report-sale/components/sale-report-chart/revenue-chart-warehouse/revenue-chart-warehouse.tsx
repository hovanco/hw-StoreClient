import { Card } from 'antd';
import { get } from 'lodash';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useReportSale } from '../../../state';

interface Props {}

const RevenueChartWarehouse: FC<Props> = () => {
    const { loading, data, selectTimes } = useReportSale();

    const dataChart = data.map((item: any) => item.revenue);
    const categoriesChart = data.map((item: any) => get(item, 'warehouse[0].name'));

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ doanh thu" bordered={false}>
            <SelectTime onChange={selectTimes} />

            <div style={{ marginTop: 30 }}>
                <ReportChart loading={loading} data={dataChart} categories={categoriesChart} name='Doanh thu' />
            </div>
        </Card>
    );
};

export { RevenueChartWarehouse };
