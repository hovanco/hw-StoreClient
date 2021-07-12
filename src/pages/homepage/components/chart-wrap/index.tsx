import React, { FC, ReactNode } from 'react';
import { Loading } from '../../../../components';
import { useReport } from '../../state';

interface Props {
    children: ReactNode;
}

const ChartWrap: FC<Props> = ({ children }) => {
    const { loading } = useReport();
    if (loading) return <Loading full />;
    return <>{children}</>;
};

export default ChartWrap;
