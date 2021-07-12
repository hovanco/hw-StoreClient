import { Row, Space, Tabs } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import customersApi from '../../../api/customer-api';
import iconPlus from '../../../assets/images/ic-plus.svg';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import { guest } from '../../../constants/guest';
import { DefaultLayout } from '../../../layout';
import { ICustomer } from '../../../models';
import { IState } from '../../../store/rootReducer';
import theme from '../../../theme';
import { CustomerContextProvider } from './context';
import CustomerName from './customer-name';
import GeneralInfo from './general-info';
import NoCustomer from './no-customer';
import OrderHistory from './order-history';
import './style.less';

export interface ICustomerDetailParams {
    customerId: string;
}

const CustomerDetail: FC = () => {
    const { TabPane } = Tabs;
    const storeObj = useSelector((state: IState) => state.store.data);
    const params = useParams<ICustomerDetailParams>();

    const [loading, setLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<ICustomer>();

    const history = useHistory();

    useEffect(() => {
        async function loadCustomer(storeId: string, customerId: string) {
            try {
                setLoading(true);
                let response = await customersApi.getCustomer({ storeId, customerId });

                setCustomer(response);
            } finally {
                setLoading(false);
            }
        }

        if (storeObj._id && params.customerId !== guest._id) {
            loadCustomer(storeObj._id, params.customerId);
        }
        // eslint-disable-next-line
    }, [storeObj._id]);

    if (loading) return <Loading />;

    if (!customer && params.customerId !== guest._id)
        return (
            <DefaultLayout title="Không tìm thấy khách hàng">
                <div className="content">
                    <NoCustomer />
                </div>
            </DefaultLayout>
        );

    return (
        <DefaultLayout title="Chi tiết khách hàng">
            <CustomerContextProvider initCustomer={customer || guest}>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to={`/customers/list${history.location.state || ''}`} text='Danh sách khách hàng' />

                            <CustomerName />
                        </>
                    }
                    rightContent={
                        <Space>
                            {/* TODO: Show after add feature */}
                            {/* <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Tạo phiếu thu/ chi
                            </InsaButton> */}
                            {/* TODO: Show after add feature */}
                            {/* <InsaButton
                                type="default"
                                icon={
                                    <img
                                        style={{ marginRight: 10 }}
                                        src={iconQuestion}
                                        alt="icon"
                                    />
                                }
                            >
                                Trợ giúp
                            </InsaButton> */}
                        </Space>
                    }
                />
                <Row
                    style={{
                        paddingLeft: theme.spacing.m,
                        paddingRight: theme.spacing.m,
                    }}
                    justify="space-between"
                    className="customer-detail"
                >
                    <GeneralInfo />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Lịch sử mua hàng" key="1">
                            <OrderHistory />
                        </TabPane>
                    </Tabs>
                </Row>
            </CustomerContextProvider>
        </DefaultLayout>
    );
};

export default CustomerDetail;
