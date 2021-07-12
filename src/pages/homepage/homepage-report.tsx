import { Col, Row, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PageTopWrapper, Warehouses } from '../../components';
import { DefaultLayout } from '../../layout';
import { SaleChannelId } from '../../models';
import { IState } from '../../store/rootReducer';
import AccessCard from './components/access-card';
import CustomerCard from './components/customer-card';
import EcomCard from './components/ecom-card';
import OrderCard from './components/order-card';
import PosCard from './components/pos-card';
import ProductsStockCard from './components/products-stock-card';
import ReturnsCard from './components/returns-card';
import SelectTimeType from './components/select-time-type';
import SocialCard from './components/socical-card';
import TotalRevenueCard from './components/total-revenue-card';
import { useReport } from './state';
import './style.less';

const title = 'Tổng quan';

function HomepageReport() {
    const store = useSelector((state: IState) => state.store.data);
    const { loadReport, counts, time, selectWareHouse, warehouseId } = useReport();

    useEffect(() => {
        if (store.warehouseId) {
            selectWareHouse(store.warehouseId);
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store._id) {
            loadReport({ time });
        }

        // eslint-disable-next-line
    }, []);

    const renderContent = () => {
        const { saleChannels } = store;

        const renderCardChanel = () => {
            return saleChannels?.map((chanel: string) => {
                const renderComponent = () => {
                    if (chanel === SaleChannelId.FACEBOOK) return <SocialCard />;
                    if (chanel === SaleChannelId.POS) return <PosCard />;
                    if (chanel === SaleChannelId.SHOPEE) return <EcomCard />;
                    return null;
                };
                return (
                    <Col span={24} key={chanel}>
                        {renderComponent()}
                    </Col>
                );
            });
        };

        return (
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Row gutter={20}>
                        <Col span={9}>
                            <div>
                                <Row gutter={[20, 20]}>
                                    <Col span={12}>
                                        <AccessCard value={counts.accessCount} />
                                    </Col>
                                    <Col span={12}>
                                        <CustomerCard value={counts.customersCount} />
                                    </Col>

                                    <Col span={12}>
                                        <OrderCard value={counts.ordersCount} />
                                    </Col>
                                    <Col span={12}>
                                        <ReturnsCard value={counts.returnedOrdersCount} />
                                    </Col>

                                    <Col span={24}>
                                        <ProductsStockCard value={counts.stocksCount} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={15}>
                            <TotalRevenueCard />
                        </Col>
                    </Row>
                </Col>

                {renderCardChanel()}
            </Row>
        );
    };

    return (
        <DefaultLayout title={title}>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>{title}</Typography.Title>}
                rightContent={
                    <Space size={15}>
                        <Warehouses warehouseId={warehouseId} selectWareHouse={selectWareHouse} />
                        <SelectTimeType />
                    </Space>
                }
            />

            <div className='content overview'>{renderContent()}</div>
        </DefaultLayout>
    );
}

export default HomepageReport;
