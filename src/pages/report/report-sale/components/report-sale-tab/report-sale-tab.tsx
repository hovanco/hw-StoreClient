import React, { FC } from 'react';
import { ReportTabs } from '../../../components';
import { ReportRouteType } from '../../../interface';
import { useReportSale } from '../../state';

interface Props {}

const ReportSaleTab: FC<Props> = () => {
    const { selectType, selectTab } = useReportSale();

    const changeReportTab = (tab: any) => {
        selectTab(tab);
    };

    const changeReportItem = (type: any) => {
        selectType(type);
    };

    return (
        <ReportTabs
            type={ReportRouteType.Sale}
            changeReportItem={changeReportItem}
            changeReportTab={changeReportTab}
        />
    );
};

export { ReportSaleTab };
