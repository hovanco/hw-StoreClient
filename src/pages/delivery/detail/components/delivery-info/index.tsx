import { Col, Row, Space } from 'antd';
import { pick } from 'lodash';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { getAddress } from '../../../../../helper';
import { IOrder, IWarehouse } from '../../../../../models';
import ShipService from '../../../list/components/ship-service';

interface Props {
    order: IOrder;
}

const DeliveryInfo: FC<Props> = ({ order }) => {
    return (
        <Row gutter={5}>
            <Col span={12}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Mã đơn hàng
                    </Col>
                    <Col span={12} className="blue-text">
                        <Space align="start">
                            :<Link to={`/orders/order/${order._id}`} target="_blank">{order.code}</Link>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Người nhận
                    </Col>
                    <Col span={12}>
                        <Space align="start">:{order.customer.name}</Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Điện thoại
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :<span>{order.customer.phoneNo}</span>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Địa chỉ nhận hàng
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :
                            <span>
                                {getAddress({
                                    ...pick(order.customer, [
                                        'address',
                                        'wardName',
                                        'districtName',
                                        'provinceName',
                                    ]),
                                })}
                            </span>
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={12}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Địa chỉ kho lấy hàng
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :
                            <span>
                                {getAddress({
                                    ...pick(order.warehouseId as IWarehouse, [
                                        'address',
                                        'wardName',
                                        'districtName',
                                        'provinceName',
                                    ]),
                                })}
                            </span>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        SĐT kho lấy hàng
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :<span>{(order.warehouseId as IWarehouse).phoneNo}</span>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Ngày đóng gói
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :<span>17h30 20/02/2020</span>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Đơn vị vận chuyển
                    </Col>
                    <Col span={12}>
                        <Space align="baseline">
                            :
                            <span>
                                <ShipService
                                    deliveryOptions={order.deliveryOptions}
                                    showTypeDelivery={false}
                                />
                            </span>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default DeliveryInfo;
