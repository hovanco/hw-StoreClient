import { Layout } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalAction } from '../../reducers/globalState/globalAction';
import Navigation from './navigation';
import Logo from '../logo';
import './style.less';
import { DoubleRightIcon, DoubleLeftIcon } from '../../assets/icon';

type Props = {};

const Sider: FC<Props> = () => {
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state: any) => state.global.isCollapsed);

    return (
        <Layout.Sider
            style={{
                overflow: 'inherit',
                minHeight: '100vh',
            }}
            collapsed={isCollapsed}
            collapsible
            onCollapse={() => dispatch(globalAction.toggleSider(!isCollapsed))}
            trigger={isCollapsed ? <DoubleRightIcon /> : <DoubleLeftIcon />}
        >
            <Logo />
            <Navigation />
        </Layout.Sider>
    );
};

export default Sider;
