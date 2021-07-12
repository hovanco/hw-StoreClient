import { Card } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useCustomerReport } from '../../../state';

interface Props {}

const ReportChartSource: FC<Props> = () => {
    const { data, loading, changeTime } = useCustomerReport();

    const onChangeTime = (data: { startTime: number; endTime: number }) => {
        changeTime(data);
    };

    const dataChart = data.map((item: any) => item.customerCount);
    const categoriesChart = data.map((item: any) => item.channel);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ theo dõi" bordered={false}>
            <SelectTime onChange={onChangeTime} />
            <div style={{ marginTop: 30 }}>
                <ReportChart data={dataChart} categories={categoriesChart} loading={loading} name='Tổng số khách hàng' />
            </div>
        </Card>
    );
};

export { ReportChartSource };
