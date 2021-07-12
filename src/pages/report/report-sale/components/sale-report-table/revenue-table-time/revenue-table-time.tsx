import { Card, Select, Row, Col } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC } from 'react';
import { InsaTable } from '../../../../../../components';
import formatMoney from '../../../../../../helper/format-money';
import { consvertDataTable } from '../../../../util';
import { useReportSale } from '../../../state';

interface Props {}

const columns: ColumnsType<any> = [
    { title: 'Thời gian', align: 'center', dataIndex: 'date', key: 'date' },
    {
        title: 'Số đơn hàng',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
    },
    {
        title: 'Doanh thu',
        dataIndex: 'revenue',
        key: 'revenue',
        align: 'center',
        render: (revenue) => formatMoney(revenue),
    },
];

const RevenueTableTime: FC<Props> = () => {
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
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Select
                                value="month"
                                style={{ width: 154 }}
                                placeholder="Bộ lọc chi tiết"
                            >
                                <Select.Option value="month">Tháng nay</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                }
                bordered
                className="report-tabs__table"
            />
        </Card>
    );
};

export { RevenueTableTime };
