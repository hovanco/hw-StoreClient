import React, { FC } from 'react';
import { NotFound } from '../../../../components';

interface Props {}

const NoProduct: FC<Props> = () => {
    return (
        <div style={{ padding: 20 }}>
            <NotFound title="Không tìm thấy sản phẩm" to="/products/list" />
        </div>
    );
};

export { NoProduct };
