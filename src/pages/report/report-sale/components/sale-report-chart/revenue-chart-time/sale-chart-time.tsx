import { Card } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useReportSale } from '../../../state';

interface Props {}

const RevenueChartTime: FC<Props> = () => {
    const { data, loading, selectTimes } = useReportSale();

    const dataChart = data.map((item: any) => item.revenue);
    const categoriesChart = data.map((item: any) => item.date);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ doanh thu" bordered={false}>
            <SelectTime onChange={selectTimes} />

            <div style={{ marginTop: 30 }}>
                <ReportChart categories={categoriesChart} data={dataChart} loading={loading} name='Doanh thu' />
            </div>
        </Card>
    );
};

export { RevenueChartTime };
