import { Space, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';
import { InsaTable } from '../../../../../components';
import { SaleChannel } from '../../../../../models';
import { useSaleChannel } from '../../state';
import SwitchChannel from '../switch-channel';

const columns: ColumnsType<SaleChannel> = [
    {
        title: 'Kênh bán hàng',
        dataIndex: '',
        key: 'name',
        render: (channel: SaleChannel) => {
            return (
                <Space>
                    <Image src={channel.icon} style={{ width: 36, height: 36 }} />

                    <div>{channel.title}</div>
                </Space>
            );
        },
    },
    {
        title: 'Trạng thái',
        width: 200,
        align: 'center',
        dataIndex: '',
        key: 'status',
        render: (channel) => {
            return <SwitchChannel used={channel.used} idChannel={channel.id} />;
        },
    },
];

const SaleChannelTable: FC = () => {
    const { saleChannels } = useSaleChannel();

    const dataSource = saleChannels.map((item) => ({ ...item, key: item.id }));

    return (
        <InsaTable
            name="Danh sách kênh"
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
        />
    );
};

export default SaleChannelTable;
