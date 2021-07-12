import { Col, Row, Space } from 'antd';
import { get } from 'lodash';
import React, { memo } from 'react';
import CustomerNote from '../../../create/components/customer-note';
import Discount from '../../../create/components/discount';
import NoteForDelivery from '../../../create/components/note-for-delivery';
import ShipmentFee from '../../../create/components/shipment-fee';
import ShipmentFeeCustomer from '../../../create/components/shipment-fee-customer';
import Shipping from '../../../create/components/shipping';
import Warehouse from '../../../create/components/warehouse';
import { EShipTypes, EStatusPage } from '../../../create/state/interface';
import { useOrderNew } from '../../../create/state/context';

const OrderShip = () => {
    const { order, statusPage, shipType } = useOrderNew();

    const isHasShip = statusPage === EStatusPage.DETAIL && get(order, 'deliveryOptions.serviceId');

    return (
        <>
            {isHasShip ? (
                <div style={{ marginTop: -15 }}>
                    <Shipping />
                </div>
            ) : (
                <></>
            )}

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Kho lấy hàng</Col>
                        <Col span={12}>
                            <Space align="start">
                                : <Warehouse />
                            </Space>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>Phí vận chuyển</Col>
                        <Col span={12}>
                            <Space align="start">
                                : <ShipmentFee />
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Phí báo khách</Col>
                        <Col span={12}>
                            <Space align="start">
                                : <ShipmentFeeCustomer />
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Chiết khấu</Col>
                        <Col span={12}>
                            <Space align="start">
                                : <Discount />
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    {shipType === EShipTypes.SendShipping && (
                        <Row gutter={[16, 16]}>
                            <Col span={12}>Ghi chú vận chuyển</Col>
                            <Col span={12}>
                                <Space align="start">
                                    : <NoteForDelivery />
                                </Space>
                            </Col>
                        </Row>
                    )}

                    <Row gutter={[16, 16]}>
                        <Col span={12}>Ghi chú của khách</Col>
                        <Col span={12}>
                            <Space align="start">
                                : <CustomerNote />
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default memo(OrderShip);
