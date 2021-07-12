import React, { FC, ReactNode, memo } from 'react';
import './default-layout.less';
import constants from '../constants';
import BaseLayout from './base-layout';

const DefaultLayout: FC<Props> = ({ children, title }) => {
    return <BaseLayout title={title}>{children}</BaseLayout>;
};

DefaultLayout.defaultProps = {
    title: constants.title,
};

type Props = {
    children: ReactNode;
    title?: string;
};
export default memo(DefaultLayout);
