import { debounce } from 'lodash';
import React, { FC } from 'react';
import { ReportTabs } from '../../../components';
import { ReportRouteType } from '../../../interface';
import { useCustomerReport } from '../../state';

interface Props {}

const ReportCustomerTab: FC<Props> = () => {
    const { selectFilter } = useCustomerReport();

    const changeReportItem = debounce((filter: any) => {
        selectFilter(filter);
    }, 500);

    return (
        <ReportTabs
            isSingleTab
            type={ReportRouteType.Customer}
            changeReportItem={changeReportItem}
        />
    );
};

export { ReportCustomerTab };
