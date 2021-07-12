import React, { FC, ReactNode } from 'react';
import { BaseLayout } from '.';
import constants from '../constants';
import './auth-layout.less';

interface Props {
    children: ReactNode;
    title?: string;
}

const AuthLayout: FC<Props> = ({ children, title = constants.title }) => {
    return (
        <BaseLayout title={title}>
            <div className="auth-layout">{children}</div>
        </BaseLayout>
    );
};

export default AuthLayout;
