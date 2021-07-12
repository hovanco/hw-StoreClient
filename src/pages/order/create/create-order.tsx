import { Card, Col, Divider, Form, Row, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { get } from 'lodash';
import React, { FC, ReactNode } from 'react';
import { EPaymentType, SaleChannelId } from '../../../models';
import ProductsTable from '../components/products-table';
import SearchProduct from '../components/search-product';
import BtnSubmitOrder from './components/btn-submit-order';
import CancelEditOrder from './components/cancel-edit-order';
import CardCustomer from './components/card-customer';
import ChangeTransportType from './components/change-transport-type';
import CustomerNote from './components/customer-note';
import Discount from './components/discount';
import NoteForDelivery from './components/note-for-delivery';
import PaymentType from './components/payment-type';
import Payments from './components/payments';
import ShipmentFee from './components/shipment-fee';
import ShipmentFeeCustomer from './components/shipment-fee-customer';
import Shipping from './components/shipping';
import Source from './components/source';
import ValueOrder from './components/value-order';
import Warehouse from './components/warehouse';
import { useOrderNew } from './state/context';
import { EShipTypes, EStatusPage } from './state/interface';
import './style.less';

interface TitleCardProps {
    children: ReactNode;
    required?: boolean;
}
const TitleFied: FC<TitleCardProps> = ({ children, required = false }) => {
    return (
        <Space size={5}>
            {children}
            {required && <sup style={{ color: 'red' }}>*</sup>}
        </Space>
    );
};

interface Props {}
const CreateOrder: FC<Props> = () => {
    const {
        products,
        customer,
        selectProduct,
        shipType,
        paymentType,
        statusPage,
        order,
        warehouseId,
        source,
        delivered,
        changeDelivery,
    } = useOrderNew();

    const isPaymentNotCod = typeof paymentType === 'number' && paymentType !== EPaymentType.PayCOD;

    const renderShip = () => {
        if (!customer || shipType === EShipTypes.SelfTransport || products.length === 0) {
            return null;
        }

        if (shipType === EShipTypes.SendShipping) {
            return <Shipping />;
        }

        const serviceId = get(order, 'deliveryOptions.serviceId');

        if (serviceId) return <Shipping />;

        return null;
    };

    return (
        <Form layout='vertical'>
            <Row gutter={16}>
                <Col span={16}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Form.Item required label='Chọn kho lấy hàng'>
                                <Warehouse />
                            </Form.Item>
                            <Card
                                title={<TitleFied required>Thông tin sản phẩm</TitleFied>}
                                type='inner'
                                bordered={false}
                                bodyStyle={{ padding: 0 }}
                                className='card-custom'
                            >
                                <div style={{ padding: '22px 18px' }}>
                                    <SearchProduct
                                        selectProduct={selectProduct}
                                        warehouseId={warehouseId}
                                    />
                                </div>
                                {products.length > 0 && <ProductsTable products={products} />}
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card
                                type='inner'
                                bordered={false}
                                title='Đóng gói và giao hàng'
                                className='card-custom'
                            >
                                {/* <Form.Item required label="Chọn kho lấy hàng">
                                    <Row gutter={24}>
                                        <Col>
                                            <Warehouse />
                                        </Col>
                                        <Col>
                                            <ChangeTransportType />
                                        </Col>
                                    </Row>
                                </Form.Item> */}
                                <Form.Item>
                                    <ChangeTransportType />
                                </Form.Item>

                                {renderShip()}

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label='Phí vận chuyển'>
                                            <ShipmentFee />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label='Phí báo khách'>
                                            <ShipmentFeeCustomer />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label='Chiết khấu'
                                            style={{
                                                marginBottom: 0,
                                            }}
                                        >
                                            <Row gutter={14}>
                                                <Discount />
                                            </Row>
                                        </Form.Item>
                                    </Col>

                                    {source === SaleChannelId.POS &&
                                        shipType === EShipTypes.SelfTransport && (
                                            <Col span={12}>
                                                <Form.Item label='Giao hàng'>
                                                    <Checkbox
                                                        checked={delivered}
                                                        style={{ marginRight: 10 }}
                                                        onChange={changeDelivery}
                                                    >
                                                        Đã giao hàng
                                                    </Checkbox>
                                                </Form.Item>
                                            </Col>
                                        )}

                                    {shipType === EShipTypes.SendShipping && (
                                        <Col span={12}>
                                            <Form.Item label='Ghi chú vận chuyển' required>
                                                <NoteForDelivery />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col span={24}>
                                        <Form.Item label='Ghi chú của khách'>
                                            <CustomerNote />
                                        </Form.Item>
                                    </Col>
                                </Row>
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
                                <Form.Item label='Chọn kênh bán hàng'>
                                    <Source />
                                </Form.Item>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card
                                type='inner'
                                title={<TitleFied required>Thông tin khách hàng</TitleFied>}
                                bordered={false}
                                className='card-custom'
                            >
                                <CardCustomer />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card
                                type='inner'
                                title={<TitleFied required>Xác nhận thanh toán</TitleFied>}
                                bordered={false}
                                className='card-custom'
                            >
                                <Form.Item
                                    style={{
                                        marginBottom: isPaymentNotCod ? 15 : 0,
                                    }}
                                >
                                    <PaymentType />
                                </Form.Item>

                                {isPaymentNotCod ? (
                                    <Form.Item required label='Hình thức thanh toán'>
                                        <Payments />
                                    </Form.Item>
                                ) : (
                                    <></>
                                )}

                                <Divider />

                                <Form.Item>
                                    <ValueOrder />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row justify='end'>
                <div style={{ paddingTop: '10px' }}>
                    <Space size={16}>
                        {statusPage === EStatusPage.EDIT && <CancelEditOrder />}
                        <BtnSubmitOrder />
                    </Space>
                </div>
            </Row>
        </Form>
    );
};

export default CreateOrder;
