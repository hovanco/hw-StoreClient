import { Col, Row, Space } from 'antd';
import { pick, get } from 'lodash';
import React, { FC } from 'react';
import formatMoney from '../../../../../helper/format-money';
import { EPaymentType, IOrder } from '../../../../../models';
import { getMoneyProduct, getValueDiscount } from '../../../../order/create/ultil';
import TransportStatus from '../../../components/transport-status';
import ShipService from '../../../list/components/ship-service';
import NoteForDelivery from '../note-for-delivery';

interface Props {
    order: IOrder;
}

const DeliveryNote: FC<Props> = ({ order }) => {
    const renderMoneyCod = () => {
        if (order.paymentType === EPaymentType.PayCOD) {
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

            const shipmentFee =
                order.deliveryOptions.shipmentFeeForCustomer || order.deliveryOptions.shipmentFee;

            return formatMoney(productPrice + shipmentFee - discountValue);
        }
        return '---';
    };

    const shipmentFee = Number(get(order, 'deliveryOptions.shipmentFee') || 0);

    return (
        <Row gutter={5}>
            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Đơn vị VC/ hình thức
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            :
                            <ShipService
                                deliveryOptions={order.deliveryOptions}
                                type="horizontal"
                            />
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Tiền thu hộ COD
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            : <span>{renderMoneyCod()}</span>
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Phí trả ĐVVC
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            : <span>{formatMoney(shipmentFee)}</span>
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Người trả phí
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            : <span>---</span>
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Đối soát
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            : <span>Chưa đối soát</span>
                        </Space>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={5}>
                    <Col span={12} className="black-text">
                        Ghi chú
                    </Col>
                    <Col span={12}>
                        <Space align="start">
                            :
                            <span>
                                {get(order, 'deliveryOptions.noteForDelivery') ? (
                                    <NoteForDelivery
                                        note={get(order, 'deliveryOptions.noteForDelivery')}
                                    />
                                ) : (
                                    '---'
                                )}
                            </span>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default DeliveryNote;
