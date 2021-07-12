import { Card, Col, Form, Input, Row, Select, Typography } from 'antd';
import React, { FC, memo } from 'react';

const SupplierFormAddress: FC = () => {
    return (
        <Card size="default" title={<Typography.Text strong>Thông tin địa chỉ</Typography.Text>}>
            <Row gutter={[32, 0]}>
                <Col span={12}>
                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Khu vực" name="area">
                        <Select placeholder="Nhóm áo thun"></Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Phường/ Xã" name="provice">
                        <Select placeholder="Phường/ xã"></Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Địa chỉ 2" name="address2">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default memo(SupplierFormAddress);
