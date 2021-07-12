import React, { FC } from 'react';
import { Card, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import formatMoney from '../../../../../helper/format-money';

interface Props {
    codStatus: any;
}

const CodStatus: FC<Props> = ({ codStatus }) => {
    const columnsHistory: ColumnType<any>[] = [
        {
            title: 'Trạng thái',
            align: 'center',
            dataIndex: 'key',
            key: 'key',
            render: (key: string) => {
                if (key === 'codProcessing') return 'Đang thu hộ';
                if (key === 'waitingCheck') return 'Chờ đối soát';
                if (key === 'checked') return 'Đã đối soát';
                if (key === 'total') return 'Tổng';

                return 'Tổng';
            },
        },
        {
            title: 'Số đơn',
            align: 'center',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Tiền thu hộ',
            align: 'center',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice: number) => `${formatMoney(totalPrice)} đ`,
        },
        {
            title: 'Phí trả ĐVVC',
            align: 'center',
            dataIndex: 'shipmentFee',
            key: 'shipmentFee',
            render: (shipmentFee: number) => `${formatMoney(shipmentFee)} đ`,
        },
    ];

    const dataSource = codStatus
        ? Object.keys(codStatus).map((key: string) => ({
              ...codStatus[key],
              key,
          }))
        : [];

    return (
        <Card
            title="Tình hình đối soát"
            type="inner"
            bordered={false}
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 16 }}
            className="card-custom"
        >
            <Table
                className="table-custom"
                columns={columnsHistory}
                dataSource={dataSource}
                pagination={false}
                bordered
            />
        </Card>
    );
};

export { CodStatus };
