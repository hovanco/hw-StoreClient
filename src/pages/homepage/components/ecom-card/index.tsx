import React from 'react';
import insaShopeeIcon from '../../../../assets/images/ic-insa-shopee.svg';
import { useReport } from '../../state';
import ChannelCard from '../channel-card';

interface Props {}

const EcomCard = (props: Props) => {
    const { revenues } = useReport();
    return (
        <ChannelCard
            icon={insaShopeeIcon}
            color="#28c8d3"
            title="Kênh bán hàng Insa Shopee"
            data={revenues.shopee}
        />
    );
};

export default EcomCard;
