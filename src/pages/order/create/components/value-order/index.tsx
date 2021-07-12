import { Col, Divider, Row } from 'antd';
import React from 'react';
import formatMoney from '../../../../../helper/format-money';
import { useOrderNew } from '../../state/context';
import { EShipTypes } from '../../state/interface';
import {
    getMoneyProduct,
    getShipmentFeeForCustomer,
    getValueDiscount,
    getMoneyForSender,
} from '../../ultil';

const ValueOrder = () => {
    const {
        products,
        shipmentFee,
        shipmentFeeForCustomer,
        discountBy,
        discount,
        shipType,
    } = useOrderNew();

    const money_products = getMoneyProduct(products);

    const value_discount = getValueDiscount({
        products,
        discount,
        discountBy,
    });

    const value_order = Math.ceil(money_products);

    const value_payment =
        Math.ceil(value_order - value_discount + getShipmentFeeForCustomer({ shipmentFeeForCustomer, shipmentFee }));

    const moneyForSender = getMoneyForSender({
        products,
        discount,
        discountBy,
        shipmentFee,
        shipmentFeeForCustomer,
    });

    const getShipmentFee = () => {
        if (shipType === EShipTypes.SelfTransport) {
            return shipmentFeeForCustomer || 0;
        }

        return shipmentFee || 0;
    };

    return (
        <Row gutter={[0, 10]}>
            <Col span={24}>
                <Row gutter={10}>
                    <Col span={13}>Giá trị đơn hàng</Col>
                    <Col span={11}>: {formatMoney(value_order)} đ</Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={10}>
                    <Col span={13}>Phí vận chuyển</Col>
                    <Col span={11}>: {formatMoney(getShipmentFee())} đ</Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={10}>
                    <Col span={13}>Chiết khấu</Col>
                    <Col span={11}>: {formatMoney(value_discount)} đ</Col>
                </Row>
            </Col>
            {/* <Col span={24}>
                <Row gutter={10}>
                    <Col span={13}>Khuyến mãi/ giảm giá</Col>
                    <Col span={11}>: 0 đ</Col>
                </Row>
            </Col> */}
            <Col span={24}>
                <Divider style={{ margin: 0 }} />
            </Col>
            <Col span={24}>
                <Row gutter={10} className="text-purple" style={{ fontWeight: 500 }}>
                    <Col span={13}>Tổng thanh toán:</Col>
                    <Col span={11}>: {formatMoney(value_payment)} đ</Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={10}>
                    <Col span={13}>Trả người gửi</Col>
                    <Col span={11} className="text-primary">
                        : {formatMoney(moneyForSender)} đ
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ValueOrder;
