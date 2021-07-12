import React, { FC, useEffect } from 'react';
import { useCustomerReport } from '../../state';
import { EFilter } from '../../state/interface';
import { ReportChartSource } from './customer-chart-source';
import { ReportChartTime } from './customer-chart-time';
import { ReportChartWarehouse } from './customer-chart-warehouse';

interface Props {}

const CustomerReportChart: FC<Props> = () => {
    const { filter, startTime, endTime, loadData } = useCustomerReport();

    useEffect(() => {
        loadData({
            filter,
            startTime: startTime as number,
            endTime: endTime as number,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, startTime, endTime]);

    const renderChart = () => {
        if (filter === EFilter.Period) return <ReportChartTime />;
        if (filter === EFilter.Province) return <ReportChartWarehouse />;
        if (filter === EFilter.Channel) return <ReportChartSource />;

        return <div />;
    };

    return <div style={{ position: 'relative' }}>{renderChart()}</div>;
};

export { CustomerReportChart };
