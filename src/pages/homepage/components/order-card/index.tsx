import { Card } from 'antd';
import React, { FC } from 'react';

interface Props {
    value?: number;
}

const OrderCard: FC<Props> = ({ value = 0 }) => {
    return (
        <Card
            className="overview-card overview-card-order"
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
                    Đặt hàng
                </span>
            </div>
        </Card>
    );
};

export default OrderCard;
