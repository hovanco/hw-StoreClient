import { Card } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useCustomerReport } from '../../../state';

interface Props {}

const ReportChartWarehouse: FC<Props> = () => {
    const { data, changeTime, loading } = useCustomerReport();

    const onChangeTime = (data: { startTime: number; endTime: number }) => {
        changeTime(data);
    };

    const dataChart = data.map((item: any) => item.customerCount);
    const categoriesChart = data.map((item: any) => item.province);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ theo dõi" bordered={false}>
            <SelectTime onChange={onChangeTime} />

            <div style={{ marginTop: 30 }}>
                <ReportChart data={dataChart} categories={categoriesChart} loading={loading} name='Tổng số khách hàng' />
            </div>
        </Card>
    );
};

export { ReportChartWarehouse };
