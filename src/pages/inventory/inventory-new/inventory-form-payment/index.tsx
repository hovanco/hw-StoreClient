import { Card, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React, { FC, memo } from 'react';

const InventoryFormPayment: FC = () => (
    <Card
        title={<Typography.Text strong>Xác nhận thanh toán</Typography.Text>}
        size="default"
        bodyStyle={{ paddingBottom: 0 }}
        className="inventory-form__payment"
    >
        <Form.Item name="warehouse" label="">
            <Radio.Group>
                <Radio value={1}>Thanh toán trước</Radio>
                <Radio value={2}>Thanh toán COD</Radio>
                <Radio value={3}>Thanh toán sau</Radio>
            </Radio.Group>
        </Form.Item>
        <Row gutter={[32, 0]}>
            <Col span={12}>
                <Form.Item
                    name="paymentMethod"
                    label={<Typography.Text strong>Hình thức thanh toán</Typography.Text>}
                >
                    <Select size="middle" value="roor">
                        <Select.Option value="root">Chuyển khoản</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="money"
                    label={<Typography.Text strong>Số tiền thanh toán</Typography.Text>}
                >
                    <Input size="middle" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[32, 0]}>
            <Col span={12}>
                <Form.Item
                    name="paymentMoney"
                    label={<Typography.Text strong>Số tiền thanh toán</Typography.Text>}
                >
                    <DatePicker size="middle" style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="reference"
                    label={<Typography.Text strong>Tham chiếu</Typography.Text>}
                >
                    <Input size="middle" />
                </Form.Item>
            </Col>
        </Row>
    </Card>
);

export default memo(InventoryFormPayment);
