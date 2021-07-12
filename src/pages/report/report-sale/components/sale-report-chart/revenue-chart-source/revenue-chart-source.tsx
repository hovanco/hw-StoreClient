import { Card } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useReportSale } from '../../../state';

interface Props {}

const RevenueChartSource: FC<Props> = () => {
    const { data, loading, selectTimes } = useReportSale();

    const dataChart = data.map((item: any) => item.revenue);
    const categoriesChart = data.map((item: any) => item.source);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ doanh thu" bordered={false}>
            <SelectTime onChange={selectTimes} />

            <div style={{ marginTop: 30 }}>
                <ReportChart loading={loading} data={dataChart} categories={categoriesChart} name='Doanh thu' />
            </div>
        </Card>
    );
};

export { RevenueChartSource };
