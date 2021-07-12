import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { get } from 'lodash';
import React, { FC } from 'react';
import { InsaTable } from '../../../../../../components';
import formatMoney from '../../../../../../helper/format-money';
import { consvertDataTable } from '../../../../util';
import { useReportSale } from '../../../state';

interface Props {}

const columns: ColumnsType<any> = [
    {
        title: 'Tên chi nhánh',
        align: 'center',
        dataIndex: '',
        key: 'warehouse',
        render: (item: any) => get(item, 'warehouse[0].name'),
    },

    {
        title: 'Doanh thu',
        align: 'center',
        dataIndex: 'revenue',
        key: 'revenue',
        render: (revenue: number) => formatMoney(revenue),
    },
];

const RevenueTableWarehouse: FC<Props> = () => {
    const { loading, data } = useReportSale();
    return (
        <Card
            className="card-shadow"
            bordered={false}
            title="Chi tiết lượng khách"
            bodyStyle={{ padding: 0 }}
            type="inner"
        >
            <InsaTable
                columns={columns}
                dataSource={consvertDataTable(data)}
                loading={loading}
                bordered
                className="report-tabs__table"
            />
        </Card>
    );
};

export { RevenueTableWarehouse };
