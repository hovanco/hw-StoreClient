import React, { FC } from 'react';

import iconImgPlaceholder from '../../../assets/images/img-placeholder.svg';

import './img-placeholder.less';

const ImgPlaceholder: FC = () => {
    return (
        <div className="img-placeholder-block">
            <img src={iconImgPlaceholder} alt="product" />
        </div>
    );
};

export default ImgPlaceholder;
