import { Tabs } from 'antd';
import get from 'lodash/get';
import React, { lazy, ReactNode, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from '../../components';
import { IState } from '../../store/rootReducer';
import HomepageUserGuide from './homepage-user-guide';
import { ProviderContextReport, useUserGuide } from './state';
import './style.less';

const { TabPane } = Tabs;
const HomepageReport = lazy(() => import('./homepage-report'));

interface ITab {
    title: string;
    key: string;
    component: ReactNode;
}

const HomepageReportCmp = () => (
    <ProviderContextReport>
        <Suspense fallback={<Loading full />}>
            <HomepageReport />
        </Suspense>
    </ProviderContextReport>
);

const tabs: ITab[] = [
    {
        key: '1',
        title: 'Khởi động',
        component: <HomepageUserGuide />,
    },
    {
        key: '2',
        title: 'Tổng quan',
        component: <HomepageReportCmp />,
    },
];

const tabBarStyle = {
    background: '#fff',
    padding: ' 0 15px',
    marginBottom: 0,
};

function HomepageContent() {
    const user = useSelector((state: IState) => state.auth.user);
    const store = useSelector((state: IState) => state.store.data);
    const { loading, userGuide } = useUserGuide();

    const callback = () => {};

    if (loading) {
        return <Loading full />;
    }

    if (get(user, '_id') !== get(store, 'ownerId') || (userGuide && userGuide.hideNewUserGuide)) {
        return <HomepageReportCmp />;
    }

    return (
        <Tabs
            defaultActiveKey="1"
            onChange={callback}
            tabBarStyle={tabBarStyle}
            tabBarGutter={30}
            size="large"
        >
            {tabs.map((tab) => (
                <TabPane tab={tab.title} key={tab.key} style={{ padding: 0 }}>
                    {tab.component}
                </TabPane>
            ))}
        </Tabs>
    );
}

export default HomepageContent;
