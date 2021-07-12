import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, memo } from 'react';
import { useOrderNew } from '../../create/state/context';
import { IProductState } from '../../create/state/interface';

interface Props {
    product: IProductState;
}

const ProductRemoveBtn: FC<Props> = ({ product }) => {
    const { removeProduct } = useOrderNew();

    const onClick = () => {
        if (product._id) {
            removeProduct(product._id);
        }
    };

    return (
        <Button type="primary" onClick={onClick} size="small" danger>
            <CloseOutlined style={{ fontSize: 12 }} />
        </Button>
    );
};

export default memo(ProductRemoveBtn);
