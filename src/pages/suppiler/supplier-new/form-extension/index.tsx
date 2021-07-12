import { Card, Col, Form, Input, Row, Typography } from 'antd';
import React, { FC, memo } from 'react';

const SupplierFormExtension: FC = () => {
    return (
        <Card size="default" title={<Typography.Text strong>Thông tin thêm</Typography.Text>}>
            <Row gutter={[32, 0]}>
                <Col span={12}>
                    <Form.Item label="Fax" name="fax">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Mã số thuế" name="tax">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Website" name="web">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default memo(SupplierFormExtension);
