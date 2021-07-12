import { ExclamationOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '../../../assets/icon';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import OrderContextProvider from '../../order/list/state/context';
import '../style.less';
import DeliveriesContent from './deliveries-content';

const title = 'Quản lý đơn giao hàng';

function DeliveryPage() {
    return (
        <OrderContextProvider>
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={<Typography.Title level={3}>{title}</Typography.Title>}
                    rightContent={
                        <Space>
                            <Link to="/orders/new">
                                <InsaButton type="primary" icon={<PlusIcon />}>
                                    Tạo đơn hàng
                                </InsaButton>
                            </Link>
                            {/* TODO: Show after add feature */}
                            {/* <InsaButton shape="circle" icon={<ExclamationOutlined />} /> */}
                        </Space>
                    }
                />

                <div className="content">
                    <DeliveriesContent />
                </div>
            </DefaultLayout>
        </OrderContextProvider>
    );
}

export default DeliveryPage;
