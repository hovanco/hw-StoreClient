import { Card, Form, Input, Typography } from 'antd';
import React, { FC, memo } from 'react';

const InventoryFormSupplier: FC = () => {
    return (
        <Card
            size="default"
            title={<Typography.Text strong>Thông tin nhà cung cấp</Typography.Text>}
        >
            <Form.Item
                name="supplier"
                label={<Typography.Text strong>Tên nhà cung cấp</Typography.Text>}
            >
                <Input.Search size="middle" placeholder="Nhà cung cấp" />
            </Form.Item>
        </Card>
    );
};

export default memo(InventoryFormSupplier);
