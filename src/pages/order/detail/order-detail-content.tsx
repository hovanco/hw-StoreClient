import { Card, Col, Form, Row, Space, Typography } from 'antd';
import { get } from 'lodash';
import React, { FC, useEffect } from 'react';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { EDeliveryServiceIds, ICustomer, ORDER_STATUS } from '../../../models';
import BtnPrint from '../components/btn-print';
import NoOrder from '../components/no-order';
import ProductsTable from '../components/products-table';
import CardCustomer from '../create/components/card-customer';
import PaymentType from '../create/components/payment-type';
import Source from '../create/components/source';
import ValueOrder from '../create/components/value-order';
import { useOrderNew } from '../create/state/context';
import BtnConfirmPayment from './components/btn-confirm-payment';
import BtnConfirmFinish from './components/btn-confrm-finish';
import BtnSendShipping from './components/btn-send-shipping';
import DateOrder from './components/date-order';
import OrderDropdownAction from './components/order-dropdown-action';
import OrderShip from './components/order-ship';
import StatusDeliveryOrder from './components/status-delivery-order';
import StatusPaymentOrder from './components/status-payment-order';
import { useHistory } from 'react-router-dom';

interface Props {}

const OrderDetailContent: FC<Props> = () => {
    const { order, addProducts, products } = useOrderNew();

    const history = useHistory();

    useEffect(() => {
        if (order) {
            const products = (order.products ? order.products : []).map((product: any) => ({
                ...product,
                ...product.productId,
            }));

            addProducts(products);
        }

        // eslint-disable-next-line
    }, []);

    if (!order) return <NoOrder />;

    const renderButton = () => {
        const serviceId = get(order, 'deliveryOptions.serviceId');
        const hasServiceTransport = [EDeliveryServiceIds.GHN, EDeliveryServiceIds.GHTK].includes(
            serviceId,
        );
        const paidAt = get(order, 'paidAt');

        const validStatus = [
            ORDER_STATUS.DELIVERED,
            ORDER_STATUS.CANCELED,
            ORDER_STATUS.RETURNED,
        ].includes(order.status);

        if (!hasServiceTransport && paidAt) {
            return validStatus ? <></> : <BtnConfirmFinish order={order} />;
        }

        if (!paidAt) {
            return <BtnConfirmPayment />;
        }

        if (validStatus) {
            return <></>;
        }

        return <></>;
    };

    return (
        <DefaultLayout title='Chi tiết đơn hàng'>
            <PageTopWrapper
                leftContent={
                    <Row gutter={20}>
                        <Col>
                            <BackLink
                                to={`/orders/list${history.location.state || ''}`}
                                text=' Danh sách đơn hàng'
                            />

                            <Typography.Title level={3}>{`Đơn hàng ${
                                order && order.code
                            }`}</Typography.Title>
                        </Col>
                        <Col>
                            <StatusDeliveryOrder order={order} />
                        </Col>
                        <Col>
                            <StatusPaymentOrder order={order} />
                        </Col>
                    </Row>
                }
                rightContent={
                    <Space>
                        {renderButton()}
                        <BtnSendShipping />
                    </Space>
                }
            />

            <div className='content'>
                <Row align='middle' justify='space-between' style={{ marginBottom: 20 }}>
                    <Col>
                        <DateOrder />
                    </Col>
                    <Col>
                        <Space size={14}>
                            <BtnPrint />

                            <OrderDropdownAction />
                        </Space>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={16}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <Card
                                    title='Thông tin sản phẩm'
                                    type='inner'
                                    bordered={false}
                                    bodyStyle={{ padding: 0 }}
                                    className='card-custom'
                                >
                                    <ProductsTable products={products} />
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card
                                    type='inner'
                                    bordered={false}
                                    title='Đóng gói và giao hàng'
                                    className='card-custom'
                                >
                                    <OrderShip />
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <Card
                                    title='Kênh bán hàng'
                                    type='inner'
                                    bordered={false}
                                    className='card-custom'
                                >
                                    <Form.Item
                                        label='Chọn kênh bán hàng'
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Source />
                                    </Form.Item>
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card
                                    title='Thông tin khách hàng'
                                    type='inner'
                                    bordered={false}
                                    className='card-custom'
                                >
                                    <CardCustomer customer={order.customer as ICustomer} />
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card
                                    type='inner'
                                    title='Xác nhận thanh toán'
                                    bordered={false}
                                    className='card-custom'
                                >
                                    <PaymentType />
                                    <ValueOrder />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row justify='end'>
                    <Col>
                        <div style={{ marginTop: '10px' }}>
                            <Space size={16}>
                                {renderButton()}
                                <BtnSendShipping />
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </DefaultLayout>
    );
};

export default OrderDetailContent;
