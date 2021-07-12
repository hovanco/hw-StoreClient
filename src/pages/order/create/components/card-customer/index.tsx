import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space } from 'antd';
import { get, compact } from 'lodash';
import React, { FC } from 'react';
import { guest } from '../../../../../constants/guest';
import { ICustomer } from '../../../../../models';
import AddCustomer from '../../../components/add-customer';
import SearchCustomer from '../../../components/search-customer';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';
import './card-customer.less';
import EditInfoDelivery from './edit-info-delivery';

interface Props {
    customer?: ICustomer;
}

const CardCustomer: FC<Props> = () => {
    const { customer, infoDelivery, selectCustomer, removeCustomer, statusPage } = useOrderNew();

    const address = get(infoDelivery, 'address');
    const wardName = get(infoDelivery, 'wardName');
    const districtName = get(infoDelivery, 'districtName');
    const provinceName = get(infoDelivery, 'provinceName');

    const addressDelivery = compact([address, wardName, districtName, provinceName]).join(', ');

    const renderCustomer = () => {
        const isNotDetailPage = statusPage !== EStatusPage.DETAIL && customer;

        return (
            <div className="customerInfo">
                <div>
                    <div className="label">
                        <Space>
                            <span>Thông tin khách hàng</span>
                            {isNotDetailPage && <CloseCircleFilled onClick={removeCustomer} />}
                        </Space>
                    </div>
                    <Row gutter={[0, 5]}>
                        <Col span={24}>
                            <Row gutter={10}>
                                <Col span={10}>Tên khách hàng</Col>
                                <Col span={14}>: {customer?.name}</Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row gutter={10}>
                                <Col span={10}>Số điện thoại</Col>
                                <Col span={14}>: {customer?.phoneNo}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Divider style={{ margin: '10px 0' }} />

                <div>
                    <div className="label">
                        <Space>
                            <span>Thông tin giao hàng</span>
                            {isNotDetailPage && customer?._id !== guest._id &&
                                <EditInfoDelivery infoDelivery={infoDelivery} />}
                        </Space>
                    </div>
                    <Row gutter={[0, 5]}>
                        <Col span={24}>
                            <Row gutter={10}>
                                <Col>
                                    {get(infoDelivery, 'name')} <br />
                                    {get(infoDelivery, 'phoneNo')}
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row gutter={10}>
                                <Col span={24}>{addressDelivery}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };

    const handleChangeCustomer = async (customer: ICustomer) => {
        await removeCustomer();
        selectCustomer(customer);
    };

    return (
        <>
            {statusPage !== EStatusPage.DETAIL && (
                <Row gutter={15}>
                    <Col style={{ flex: 1 }}>
                        <SearchCustomer selectCustomer={handleChangeCustomer} />
                    </Col>
                    <Col>
                        <AddCustomer selectCustomer={selectCustomer}>
                            <Button type="primary" icon={<PlusOutlined />} />
                        </AddCustomer>
                    </Col>
                </Row>
            )}

            {renderCustomer()}
        </>
    );
};

export default CardCustomer;
