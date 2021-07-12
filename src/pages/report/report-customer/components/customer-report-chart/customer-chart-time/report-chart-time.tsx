import { Card } from 'antd';
import React, { FC } from 'react';
import { ReportChart, SelectTime } from '../../../../components';
import { useCustomerReport } from '../../../state';

interface Props {}

const ReportChartTime: FC<Props> = () => {
    const { data, changeTime, loading } = useCustomerReport();

    const onChangeTime = (data: { startTime: number; endTime: number }) => {
        changeTime(data);
    };

    const dataChart = data.map((item: any) => item.customerCount);
    const categoriesChart = data.map((item: any) => item.date);

    return (
        <Card type="inner" className="card-shadow" title="Biểu đồ theo dõi" bordered={false}>
            <SelectTime onChange={onChangeTime} />

            <div style={{ marginTop: 30 }}>
                <ReportChart
                    name='Tổng số khách hàng'
                    data={dataChart}
                    categories={categoriesChart}
                    loading={loading}
                />
            </div>
        </Card>
    );
};

export { ReportChartTime };
