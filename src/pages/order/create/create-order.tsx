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
                            <Form.Item required label='Ch???n kho l???y h??ng'>
                                <Warehouse />
                            </Form.Item>
                            <Card
                                title={<TitleFied required>Th??ng tin s???n ph???m</TitleFied>}
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
                                title='????ng g??i v?? giao h??ng'
                                className='card-custom'
                            >
                                {/* <Form.Item required label="Ch???n kho l???y h??ng">
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
                                        <Form.Item label='Ph?? v???n chuy???n'>
                                            <ShipmentFee />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label='Ph?? b??o kh??ch'>
                                            <ShipmentFeeCustomer />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label='Chi???t kh???u'
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
                                                <Form.Item label='Giao h??ng'>
                                                    <Checkbox
                                                        checked={delivered}
                                                        style={{ marginRight: 10 }}
                                                        onChange={changeDelivery}
                                                    >
                                                        ???? giao h??ng
                                                    </Checkbox>
                                                </Form.Item>
                                            </Col>
                                        )}

                                    {shipType === EShipTypes.SendShipping && (
                                        <Col span={12}>
                                            <Form.Item label='Ghi ch?? v???n chuy???n' required>
                                                <NoteForDelivery />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col span={24}>
                                        <Form.Item label='Ghi ch?? c???a kh??ch'>
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
                                title='K??nh b??n h??ng'
                                type='inner'
                                bordered={false}
                                className='card-custom'
                            >
                                <Form.Item label='Ch???n k??nh b??n h??ng'>
                                    <Source />
                                </Form.Item>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card
                                type='inner'
                                title={<TitleFied required>Th??ng tin kh??ch h??ng</TitleFied>}
                                bordered={false}
                                className='card-custom'
                            >
                                <CardCustomer />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card
                                type='inner'
                                title={<TitleFied required>X??c nh???n thanh to??n</TitleFied>}
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
                                    <Form.Item required label='H??nh th???c thanh to??n'>
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
