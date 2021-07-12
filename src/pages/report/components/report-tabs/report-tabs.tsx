import { Card, Col, Row, Tabs, Typography } from 'antd';
import cls from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import theme from '../../../../theme';
import { ReportRouteType } from '../../interface';
import {
    ReportCustomerTabs,
    ReportFinancinalTabs,
    ReportSaleTabs,
    ReportWareHouseTabs,
    tabCustomer,
    tabInventory,
    tabRevenue,
    tabWareProfitLoss,
} from './list-tabs';
import './report-tabs.less';

const { TabPane } = Tabs;

type Props = {
    type: ReportRouteType;
    isSingleTab?: boolean;
    changeReportItem?: (type: any) => void; //TODO add type any
    changeReportTab?: (tab: any) => void;
};

const ReportTabs: FC<Props> = ({ type, isSingleTab, changeReportItem, changeReportTab }) => {
    const [activeTab, setActiveTab] = useState<string>('revenue');
    const [activeTabItem, setActiveTabItem] = useState<any>(tabRevenue[0].key);

    const currentTabs = (): any[] => {
        switch (type) {
            case ReportRouteType.Sale:
                return ReportSaleTabs;
            case ReportRouteType.WareHouse:
                return ReportWareHouseTabs;
            case ReportRouteType.Financinal:
                return ReportFinancinalTabs;
            case ReportRouteType.Customer:
                return ReportCustomerTabs;
            default:
                return [];
        }
    };

    const handleChangeTab = (value: string): void => {
        const nextTab = currentTabs().find((e) => e.key === value);
        setActiveTab(value);
        setActiveTabItem(nextTab?.tabs[0].key as string);
        if (changeReportTab && changeReportItem) {
            changeReportTab(value);
            changeReportItem(nextTab?.tabs[0].key as string);
        }
    };

    useEffect(() => {
        switch (type) {
            case ReportRouteType.Sale:
                setActiveTabItem(tabRevenue[0].key);
                setActiveTab('revenue');
                break;
            case ReportRouteType.WareHouse:
                setActiveTabItem(tabInventory[0].key);
                setActiveTab('inventory');
                break;
            case ReportRouteType.Financinal:
                setActiveTabItem(tabWareProfitLoss[0].key);
                setActiveTab('profitLoss');
                break;

            case ReportRouteType.Customer:
                setActiveTabItem(tabCustomer[0].key);
                setActiveTab('customer');
                break;
            default:
                break;
        }
        // eslint-disable-next-line
    }, [type]);

    const renderTab = (tabs: any[]) => {
        const span = tabs.length > 3 ? 6 : 8;

        return (
            <Row gutter={[theme.spacing.m, theme.spacing.m]}>
                {tabs.map((tab) => {
                    const handleSetTabItem = () => {
                        if (activeTabItem !== tab.key) {
                            setActiveTabItem(tab.key);
                            if (changeReportItem) {
                                changeReportItem(tab.key);
                            }
                        }
                    };
                    const className = cls('report-tabs__group-item', 'card-shadow', {
                        is_active: tab.key === activeTabItem,
                    });

                    return (
                        <Col span={span} key={tab.key}>
                            <Card className={className} bordered={false} onClick={handleSetTabItem}>
                                {tab?.icon}
                                <Typography.Text
                                    style={{
                                        display: 'block',
                                        fontWeight: 500,
                                    }}
                                >
                                    {tab.label}
                                </Typography.Text>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    };

    return (
        <div className={cls('report-tabs', { is_single: isSingleTab })}>
            {isSingleTab ? (
                currentTabs().map((tabs) => renderTab(tabs.tabs))
            ) : (
                <Tabs type="card" activeKey={activeTab} onChange={handleChangeTab}>
                    {currentTabs().map((tabs) => (
                        <TabPane tab={tabs.label} key={tabs.key}>
                            {renderTab(tabs.tabs)}
                        </TabPane>
                    ))}
                </Tabs>
            )}
        </div>
    );
};

export { ReportTabs };
