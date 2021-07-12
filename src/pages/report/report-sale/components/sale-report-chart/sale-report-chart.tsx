import React, { FC } from 'react';
import { useReportSale } from '../../state';
import { EFilter } from '../../state/interface';
import { DeliveryChartSource } from './delivery-chart-source';
import { DeliveryChartWarehouse } from './delivery-chart-warehouse';
import { RevenueChartSource } from './revenue-chart-source';
import { RevenueChartStaff } from './revenue-chart-staff';
import { RevenueChartTime } from './revenue-chart-time';
import { RevenueChartWarehouse } from './revenue-chart-warehouse';

interface Props {}

const SaleReportChart: FC<Props> = () => {
    const { filter, tab } = useReportSale();

    if (tab === 'revenue' && filter === EFilter.Period) return <RevenueChartTime />;
    if (tab === 'revenue' && filter === EFilter.Channel) return <RevenueChartSource />;
    if (tab === 'revenue' && filter === EFilter.Warehouse) return <RevenueChartWarehouse />;
    if (tab === 'revenue' && filter === EFilter.Staff) return <RevenueChartStaff />;

    if (tab === 'delivery' && filter === EFilter.Channel) return <DeliveryChartSource />;
    if (tab === 'delivery' && filter === EFilter.Warehouse) return <DeliveryChartWarehouse />;

    return <div />;
};

export { SaleReportChart };
