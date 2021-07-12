import React, { FC } from 'react';

interface Props {
    icon: string;
}

const IconCard: FC<Props> = ({ icon }) => {
    return (
        <div>
            <img src={icon} alt="" style={{ height: 30 }} />
        </div>
    );
};

export default IconCard;
