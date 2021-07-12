import React, { FC, ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import constants from '../constants';
import './customer-layout.less';

interface Props {
    title?: string;
    children: ReactNode;
}

const CustomerLayout: FC<Props> = ({ title, children }): ReactElement => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

CustomerLayout.defaultProps = {
    title: constants.title,
};

export default CustomerLayout;
