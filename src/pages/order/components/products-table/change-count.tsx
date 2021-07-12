import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import React, { FC } from 'react';
import { useOrderNew } from '../../create/state/context';
import { EStatusPage, IProductState } from '../../create/state/interface';

interface Props {
    product: IProductState;
}

const ChangeCount: FC<Props> = ({ product }) => {
    const { updateCount, statusPage } = useOrderNew();

    if (statusPage === EStatusPage.DETAIL) {
        return <>{product.count}</>;
    }

    const onChangCount = (value?: string | number) => {
        handleChangeCount(Number(value));
    };

    const removeCount = () => {
        handleChangeCount(product.count - 1);
    };

    const addCount = () => {
        handleChangeCount(product.count + 1);
    };

    const handleChangeCount = (count: number) => {
        const new_product = { ...product, count };
        updateCount(new_product);
    };

    return (
        <Space size={3}>
            <Button
                size="small"
                type="text"
                icon={<MinusOutlined />}
                disabled={product.count === 1}
                onClick={removeCount}
            />
            <InputNumber
                value={product.count}
                onChange={onChangCount}
                min={1}
                max={product.quantity}
                style={{ width: 60, textAlign: 'center' }}
            />
            <Button
                size="small"
                type="text"
                icon={<PlusOutlined />}
                onClick={addCount}
                disabled={product.count === product.quantity}
            />
        </Space>
    );
};

export default ChangeCount;
