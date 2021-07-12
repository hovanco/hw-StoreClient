import React, { FC, ReactNode } from 'react';
import constants from '../constants';
import { CustomerLayout } from '.';

import './sidebar-layout.less';

interface Props {
    title?: string;
    children: ReactNode;
}

const SidebarLayout: FC<Props> = ({ title, children }): JSX.Element => {
    return (
        <CustomerLayout title={title}>
            <div className="wrap-layout-sidebar">{children}</div>
        </CustomerLayout>
    );
};

SidebarLayout.defaultProps = {
    title: constants.title,
};

export default SidebarLayout;
