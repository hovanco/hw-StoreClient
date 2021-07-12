import React, { FC } from 'react';
import { NotFound } from '../../../components';

const style = {
    padding: 20,
};

const NoCustomer: FC = () => {
    return (
        <div style={{ ...style }}>
            <NotFound title="Không tìm thấy khách hàng" to="/customers" />
        </div>
    );
};

export default NoCustomer;
