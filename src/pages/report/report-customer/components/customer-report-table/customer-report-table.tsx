import React, { FC } from 'react';
import { useCustomerReport } from '../../state';
import { ReportTableTime } from './report-table-time';
import { ReportTableWarehouse } from './report-table-warehouse';
import { ReportTableSource } from './report-table-source';
import { EFilter } from '../../state/interface';

interface Props {}

const CustomerReportTable: FC<Props> = () => {
    const { filter } = useCustomerReport();

    if (filter === EFilter.Period) return <ReportTableTime />;
    if (filter === EFilter.Channel) return <ReportTableSource />;
    if (filter === EFilter.Province) return <ReportTableWarehouse />;

    return <div />;
};

export { CustomerReportTable };
