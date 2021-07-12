import { Col, Row } from 'antd';
import React from 'react';
import moment from 'moment';
import { useOrderNew } from '../../../create/state/context';
import { IOrder } from '../../../../../models';
import './date-order.less';

const DateOrder = () => {
    const { order } = useOrderNew();

    return (
        <Row gutter={5} align="middle" className="date-order">
            <Col>NGÀY TẠO ĐƠN: {moment((order as IOrder).createdAt).format('DD/MM/YYYY')}</Col>
        </Row>
    );
};

export default DateOrder;
