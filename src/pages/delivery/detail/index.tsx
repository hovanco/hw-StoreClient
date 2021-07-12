import { DownOutlined, PrinterOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Row, Space, Typography } from 'antd';
import React from 'react';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import NoOrder from '../../order/components/no-order';
import SelectTransportStatus from '../components/select-transport-status';
import DeliveryInfo from './components/delivery-info';
import DeliveryNote from './components/delivery-note';
import DeliveryStatus from './components/delivery-status';
import ProductTable from './components/product-table';
import { ProviderDeliveryDetail, useDeliveryDetail } from './state';
import './style.less';

const title = 'Chi tiết đơn giao hàng';

function DeliveryContent() {
    const { loading, order, setOrder } = useDeliveryDetail();

    if (loading) return <Loading full />;

    if (!order) return <NoOrder />;

    return (
        <DefaultLayout title={title}>
            <PageTopWrapper
                leftContent={
                    <div>
                        <BackLink to="/delivery/list" text="Quản lý vận chuyển" isGoBack />

                        <Row gutter={16} align="middle">
                            <Col>
                                <Typography.Title level={3}>{order.code}</Typography.Title>
                            </Col>
                            <Col>
                                <DeliveryStatus order={order} />
                            </Col>
                        </Row>
                    </div>
                }
            />

            <div className="content">
                <Row gutter={[0, 16]}>
                    {/* TODO: Show after add feature */}
                    {/* <Col span={24}>
                        <Row justify="end" align="middle">
                            <Space>
                                <InsaButton icon={<PrinterOutlined />}>
                                    <Typography.Text type="secondary">In vận đơn</Typography.Text>
                                </InsaButton>
                                <Row>
                                    <InsaButton>
                                        <Typography.Text type="secondary">
                                            Thao tác khác
                                        </Typography.Text>
                                    </InsaButton>
                                    <Dropdown overlay={<></>}>
                                        <InsaButton>
                                            <DownOutlined />
                                        </InsaButton>
                                    </Dropdown>
                                </Row>
                            </Space>
                        </Row>
                    </Col> */}

                    <Col span={24}>
                        <Row justify="space-between" gutter={16}>
                            <Col span="15">
                                <Card
                                    title="Thông tin vận đơn"
                                    type="inner"
                                    bordered={false}
                                    className="card-custom"
                                >
                                    <DeliveryInfo order={order} />
                                </Card>

                                <Card
                                    type="inner"
                                    bordered={false}
                                    bodyStyle={{ padding: 0 }}
                                    className="card-custom"
                                    title="Chi tiết phiếu giao hàng"
                                    style={{ marginTop: 16 }}
                                >
                                    <ProductTable order={order} />
                                </Card>
                            </Col>
                            <Col span="9">
                                <Card
                                    title="Thông tin phiếu giao hàng"
                                    type="inner"
                                    bordered={false}
                                    className="card-custom"
                                >
                                    <DeliveryNote order={order} />
                                </Card>

                                <Card
                                    title="Trạng thái vận chuyển"
                                    type="inner"
                                    bordered={false}
                                    className="card-custom"
                                    style={{ marginTop: 16 }}
                                >
                                    <SelectTransportStatus order={order} updateOrder={setOrder} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </DefaultLayout>
    );
}

function Delivery() {
    return (
        <ProviderDeliveryDetail>
            <DeliveryContent />
        </ProviderDeliveryDetail>
    );
}

export default Delivery;
