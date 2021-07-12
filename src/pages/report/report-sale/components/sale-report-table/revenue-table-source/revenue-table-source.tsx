import { Card, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC } from 'react';
import { InsaTable } from '../../../../../../components';
import formatMoney from '../../../../../../helper/format-money';
import { consvertDataTable } from '../../../../util';
import { useReportSale } from '../../../state';

interface Props {}

const columns: ColumnsType<any> = [
    {
        title: 'Kênh bán hàng',
        align: 'center',
        dataIndex: 'source',
        key: 'source',
    },
    {
        title: 'Số đơn hàng',
        align: 'center',
        dataIndex: 'count',
        key: 'count',
    },

    {
        title: 'Doanh thu',
        align: 'center',
        dataIndex: 'revenue',
        key: 'revenue',
        render: (revenue: number) => formatMoney(revenue),
    },
];

const RevenueTableSource: FC<Props> = () => {
    const { data } = useReportSale();
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
                headerExtend={
                    <Select style={{ width: 154 }} placeholder="Bộ lọc chi tiết"></Select>
                }
                bordered
                className="report-tabs__table"
            />
        </Card>
    );
};

export { RevenueTableSource };
