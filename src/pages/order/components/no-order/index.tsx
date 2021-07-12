import React, { FC } from 'react';
import { NotFound } from '../../../../components';

const style = {
    padding: 20,
};

const NoOrder: FC = () => {
    return (
        <div style={{ ...style }}>
            <NotFound title="Không tìm thấy đơn hàng" to="/orders/list" />
        </div>
    );
};

export default NoOrder;
