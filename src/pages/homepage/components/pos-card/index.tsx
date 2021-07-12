import React from 'react';
import insaPosIcon from '../../../../assets/images/ic-insa-pos.svg';
import { useReport } from '../../state';
import ChannelCard from '../channel-card';

interface Props {}

const PosCard = (props: Props) => {
    const { revenues } = useReport();
    return (
        <ChannelCard
            icon={insaPosIcon}
            color="#f05050"
            title="Kênh bán hàng Insa Pos"
            data={revenues.pos}
        />
    );
};

export default PosCard;
