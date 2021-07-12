import { Card, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC } from 'react';
import { InsaTable } from '../../../../../../components';
import formatMoney from '../../../../../../helper/format-money';
import { consvertDataTable } from '../../../../util';
import { useCustomerReport } from '../../../state';

interface Props {}

const columns: ColumnsType<any> = [
    {
        title: 'Thành phố',
        align: 'center',
        dataIndex: 'province',
        key: 'province',
    },
    {
        title: 'Doanh thu',
        align: 'center',
        dataIndex: 'revenue',
        key: 'revenue',
        render: (revenue: number) => formatMoney(revenue),
    },
    {
        title: 'Tổng số khách hàng',
        align: 'center',
        dataIndex: 'customerCount',
        key: 'customerCount',
    },
];

const ReportTableWarehouse: FC<Props> = () => {
    const { data, loading } = useCustomerReport();

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
                headerExtend={
                    <Select style={{ width: 154 }} placeholder="Bộ lọc chi tiết"></Select>
                }
                bordered
                className="report-tabs__table"
            />
        </Card>
    );
};

export { ReportTableWarehouse };
