import React, { FC } from 'react';

import { Empty } from 'antd';

const NoProduct: FC = () => {
    return (
        <div className='no-products'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không có sản phẩm' />
        </div>
    );
};

export default NoProduct;
