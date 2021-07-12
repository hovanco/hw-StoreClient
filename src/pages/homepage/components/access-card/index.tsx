import { Card } from 'antd';
import React, { FC } from 'react';

interface Props {
    value?: number;
}

const AccessCard: FC<Props> = ({ value = 0 }) => {
    return (
        <Card className="overview-card" bodyStyle={{ padding: 0 }} bordered={false}>
            <div className="overview-number">
                <div className="number">{value}</div>
                <span className="label">Truy cập</span>
            </div>
        </Card>
    );
};

export default AccessCard;
