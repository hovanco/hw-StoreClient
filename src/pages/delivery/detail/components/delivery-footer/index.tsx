import { Col, Row, Space } from 'antd';
import { pick, get } from 'lodash';
import React, { FC } from 'react';
import { TextEllipsis } from '../../../../../components';
import formatMoney from '../../../../../helper/format-money';
import { IOrder } from '../../../../../models';
import { getMoneyProduct, getValueDiscount } from '../../../../order/create/ultil';

interface Props {
    order: IOrder;
}

const DeliveryFooter: FC<Props> = ({ order }) => {
    const products = order.products.map((product: any) => ({
        ...product.productId,
        ...pick(product, ['count', 'price']),
    }));

    const productPrice = getMoneyProduct(products);

    const discountValue = getValueDiscount({
        products,

        discount: order.deliveryOptions.discount,
        discountBy: order.deliveryOptions.discountBy,
    });

    const shipmentFee = Number(get(order, 'deliveryOptions.shipmentFee') || 0);
    const shipmentFeeForCustomer =
        Number(get(order, 'deliveryOptions.shipmentFeeForCustomer')) || 0;

    const totalPrice = productPrice + shipmentFeeForCustomer - discountValue;

    return (
        <Row justify="end">
            <Col>
                <Space direction="vertical" size={10} style={{ width: 280 }}>
                    <Row gutter={10}>
                        <Col span={14}>
                            <TextEllipsis>Tổng tiền</TextEllipsis>
                        </Col>
                        <Col span={10}>
                            <Space align="start">
                                :<span>{formatMoney(productPrice)}</span>
                            </Space>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={14}>
                            <TextEllipsis>Chiết khấu</TextEllipsis>
                        </Col>
                        <Col span={10}>
                            <Space align="start">
                                :<span>{formatMoney(discountValue)}</span>
                            </Space>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={14}>
                            <TextEllipsis>Phí giao hàng</TextEllipsis>
                        </Col>
                        <Col span={10}>
                            <Space align="start">
                                :<span>{formatMoney(shipmentFee)}</span>
                            </Space>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={14}>
                            <TextEllipsis>Phí giao hàng báo khách</TextEllipsis>
                        </Col>
                        <Col span={10}>
                            <Space align="start">
                                :<span>{formatMoney(shipmentFeeForCustomer)}</span>
                            </Space>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={14}>
                            <TextEllipsis>Khách phải trả</TextEllipsis>
                        </Col>
                        <Col span={10}>
                            <Space align="start">
                                :<span>{formatMoney(totalPrice)}</span>
                            </Space>
                        </Col>
                    </Row>
                </Space>
            </Col>
        </Row>
    );
};

export default DeliveryFooter;
