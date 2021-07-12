import React, { FC } from 'react';

import { Typography } from 'antd';
import { useCustomer } from './context';

const CustomerName: FC = () => {
    const { customer } = useCustomer();

    return <Typography.Title level={3}>{customer?.name}</Typography.Title>;
};

export default CustomerName;
