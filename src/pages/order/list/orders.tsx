import { Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import iconPlus from '../../../assets/images/ic-plus.svg';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import theme from '../../../theme';
import '../style.less';
import FilterBar from './filter-bar';
import FilterDropdownOrder from './filter-dropdown-order';
import OrdersTable from './orders-table';
import SearchOrder from './search-order';
import { useOrdersContext } from './state/context';
import StatusSelect from './status-select';

function OrderPage() {
    const { status } = useOrdersContext();

    return (
        <DefaultLayout title="Orders">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>DANH SÁCH ĐƠN HÀNG</Typography.Title>}
                rightContent={
                    <Space>
                        <Link to="/orders/new">
                            <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Tạo đơn hàng
                            </InsaButton>
                        </Link>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton shape="circle" icon={<ExclamationOutlined />} /> */}
                    </Space>
                }
            />
            <div style={{ padding: 16 }}>
                <Space style={{ width: '100%' }} direction="vertical">
                    <Row justify="space-between" align="middle" gutter={15}>
                        <Col>
                            <StatusSelect status={status} />
                        </Col>

                        <Col>
                            <div className="order-header">
                                <FilterDropdownOrder />

                                <SearchOrder />
                            </div>
                        </Col>
                    </Row>
                    <FilterBar />
                </Space>
            </div>

            <Row
                style={{
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <OrdersTable />
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default OrderPage;
