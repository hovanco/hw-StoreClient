import React from 'react';
// import SocialIcon from '../../assets/social-icon.svg';
import { useReport } from '../../state';
import ChanelCard from '../channel-card';
import insaFacebookIcon from '../../../../assets/images/ic-insa-facebook.svg';

interface Props {}

const SocialCard = (props: Props) => {
    const { revenues } = useReport();
    return (
        <ChanelCard
            icon={insaFacebookIcon}
            color="#0872d7"
            title="Kênh bán hàng Insa Facebook"
            data={revenues.facebook}
        />
    );
};

export default SocialCard;
