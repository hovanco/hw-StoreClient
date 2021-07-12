import React, { FC } from 'react';
import { useReportSale } from '../../state';
import { RevenueTableStaff } from './revenue-table-staff';
import { RevenueTableTime } from './revenue-table-time';
import { RevenueTableWarehouse } from './revenue-table-warehouse';
import { RevenueTableSource } from './revenue-table-source';
import { DeliveryTableSource } from './delivery-table-source';
import { DeliveryTableWarehouse } from './delivery-table-warehouse';
import { EFilter } from '../../state/interface';

interface Props {}

const SaleReportTable: FC<Props> = () => {
    const { filter, tab } = useReportSale();

    if (tab === 'revenue' && filter === EFilter.Period) return <RevenueTableTime />;
    if (tab === 'revenue' && filter === EFilter.Warehouse) return <RevenueTableWarehouse />;

    if (tab === 'revenue' && filter === EFilter.Staff) return <RevenueTableStaff />;
    if (tab === 'revenue' && filter === EFilter.Channel) return <RevenueTableSource />;

    if (tab === 'delivery' && filter === EFilter.Channel) return <DeliveryTableSource />;
    if (tab === 'delivery' && filter === EFilter.Warehouse) return <DeliveryTableWarehouse />;

    return <div />;
};

export { SaleReportTable };
