import { Card, Col, Row } from 'antd';
import clx from 'classnames';
import React, { FC, useState } from 'react';
import { ORDER_STATUS } from '../../../../../models/order';
import ModalDeliveryList from '../modal-list-delivery';

interface IStatusCount {}
interface Props {
    statusCounts: any[];
    times: any[];
}

interface IStatusCount {
    count: number;
    status: ORDER_STATUS;
    title: string;
}

const dataBase: IStatusCount[] = [
    {
        count: 0,
        status: ORDER_STATUS.NEW,
        title: 'Chờ đóng gói',
    },
    {
        count: 0,
        status: ORDER_STATUS.WAIT_FOR_DELIVERY,
        title: 'Đã đóng gói',
    },
    {
        count: 0,
        status: ORDER_STATUS.DELIVERING,
        title: 'Đang giao',
    },
    {
        count: 0,
        status: ORDER_STATUS.CANCELED,
        title: 'Hủy giao - chờ nhận',
    },
    {
        count: 0,
        status: ORDER_STATUS.DELIVERED,
        title: 'Đã giao',
    },
    {
        count: 0,
        status: ORDER_STATUS.RETURNED,
        title: 'Hủy giao - đã nhận',
    },
];

const StatusCounts: FC<Props> = ({ statusCounts, times }) => {
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(0);

    const data = dataBase.map((item: any) => {
        const exist = statusCounts.find((i: any) => i.status === item.status);

        return {
            ...item,
            ...exist,
        };
    });

    const showListDelivery = (item: any) => {
        setStatus(item.status);
        setVisible(true);
    }

    return (
        <Row className="delivery-card" gutter={[16, 16]}>
            {data.map((item) => {
                const className = clx('card-custom', {
                    cancel: item.status === ORDER_STATUS.CANCELED,
                    delivered: item.status === ORDER_STATUS.DELIVERED,
                    returned: item.status === ORDER_STATUS.RETURNED,
                });
                return (
                    <Col key={item.status} span={8}>
                        <Card className={className} bordered={false} type="inner" onClick={() => showListDelivery(item)}>
                            <div className="delivery-number">{item.count}</div>
                            <span className="delivery-status">{item.title}</span>
                        </Card>
                    </Col>
                );
            })}
            <ModalDeliveryList status={status} times={times} visible={visible} setVisible={setVisible} />
        </Row>
    );
};

export { StatusCounts };
