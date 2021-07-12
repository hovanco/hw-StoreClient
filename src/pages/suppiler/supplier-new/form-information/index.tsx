import { Card, Col, Form, Input, Row, Select, Typography } from 'antd';
import React, { FC, memo } from 'react';

const SupplierFormInformation: FC = () => {
    return (
        <Card
            size="default"
            title={<Typography.Text strong>Thông tin nhà cung cấp</Typography.Text>}
        >
            <Form.Item
                name="supplier"
                label={<Typography.Text strong>Tên nhà cung cấp</Typography.Text>}
            >
                <Input size="middle" placeholder="Nhà cung cấp" />
            </Form.Item>
            <Row gutter={[32, 0]}>
                <Col span={12}>
                    <Form.Item label="Mã nhà cung cấp" name="code">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Nhóm" name="group">
                        <Select placeholder="Nhóm áo thun"></Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Số điện thoại" name="phone">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default memo(SupplierFormInformation);
