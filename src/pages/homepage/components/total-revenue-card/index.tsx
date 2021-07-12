import { Card } from 'antd';
import React, { FC, memo } from 'react';
import { useReport } from '../../state';
import './total-revenue-card.less';
import TotalRevenueChart from './total-revenue-chart';

interface Props {}

const TotalRevenueCard: FC<Props> = () => {
    const { revenues } = useReport();

    const renderContentData = () => {
        if (!revenues.all) {
            return null;
        }

        const categories = revenues.all.data.map((item: any) => item.date);

        const values = revenues.all.data.map((item: any) => item.value);
        return <TotalRevenueChart categories={categories} values={values} />;
    };

    return (
        <Card
            className="overview-card total-revenue-card"
            style={{ height: '100%' }}
            bordered={false}
        >
            <div className="title">Tổng doanh thu</div>

            <div style={{ height: 250 }}>{renderContentData()}</div>
        </Card>
    );
};

export default memo(TotalRevenueCard);
