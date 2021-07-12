import { Card } from 'antd';
import React, { FC } from 'react';

interface Props {
    value?: number;
}

const ReturnsCard: FC<Props> = ({ value = 0 }) => {
    return (
        <Card className="overview-card" bodyStyle={{ padding: 0 }} bordered={false}>
            <div className="overview-number">
                <div
                    className="number"
                    style={{
                        color: '#23b7e5',
                    }}
                >
                    {value}
                </div>
                <span className="label">Trả hàng</span>
            </div>
        </Card>
    );
};

export default ReturnsCard;
