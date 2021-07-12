import React, { useEffect, ReactNode, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';

import constants from '../constants';

interface IProps {
    title?: string;
    children: ReactNode;
}

const BaseLayout = ({ title, children }: IProps) => {
    const location = useLocation();
    const prevLocation = useRef<any>();

    useEffect(() => {
        if (prevLocation.current !== location.pathname) {
            window.scrollTo(0, 0);
            prevLocation.current = location.pathname;
        }
    }, [location]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

BaseLayout.defaultProps = {
    title: constants.title,
};

export default BaseLayout;
