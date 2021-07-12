import { Tag } from 'antd';
import React, { FC } from 'react';
import { SaleChannelId } from '../../models';

const channels: { [id: string]: { color: string; title: string } } = {
    [SaleChannelId.POS]: {
        color: '#A0BF35',
        title: 'POS',
    },
    [SaleChannelId.FACEBOOK]: {
        color: '#1773EB',
        title: 'FACEBOOK',
    },
    [SaleChannelId.SHOPEE]: {
        color: '#E74B2B',
        title: 'SHOPEE',
    },
    [SaleChannelId.INSAWEB]: {
        color: '#02498B',
        title: 'INSAWEB',
    },
    [SaleChannelId.TIKI]: {
        color: '#01B1EA',
        title: 'TIKI',
    },
};

interface Props {
    channelId: SaleChannelId;
}

const SaleChannelLabel: FC<Props> = ({ channelId }) => {
    const channel = channels[channelId];

    if (channel) {
        return <Tag color={channel.color}>{channel.title}</Tag>;
    }

    return <></>;
};

export default SaleChannelLabel;
