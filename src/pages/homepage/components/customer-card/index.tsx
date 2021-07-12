import { Card } from 'antd';
import React, { FC } from 'react';

interface Props {
    value?: number;
}

const CustomerCard: FC<Props> = ({ value }) => {
    return (
        <Card
            className="overview-card overview-card-customer"
            bodyStyle={{ padding: 0 }}
            bordered={false}
        >
            <div className="overview-number">
                <div
                    className="number"
                    style={{
                        color: ' #fff',
                    }}
                >
                    {value}
                </div>
                <span
                    className="label"
                    style={{
                        color: ' #fff',
                    }}
                >
                    Khách hàng
                </span>
            </div>
        </Card>
    );
};

export default CustomerCard;
