import { Card, Col, DatePicker, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { FC, memo } from 'react';
import iconClose from '../../../../assets/images/ic-close.svg';

const InventoryFormOrder: FC = () => (
    <Card size="default" title={<Typography.Text strong>Thông tin đơn hàng</Typography.Text>}>
        <Row gutter={[32, 0]}>
            <Col span={12}>
                <Form.Item
                    name="orderNumber"
                    label={<Typography.Text strong>Mã đơn nhập hàng</Typography.Text>}
                >
                    <Input size="middle" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="branch"
                    label={<Typography.Text strong>Chi nhánh</Typography.Text>}
                >
                    <Select size="middle" value="roor">
                        <Select.Option value="root">Chính sách giá</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[32, 0]}>
            <Col span={12}>
                <Form.Item
                    name="pricingPolicy"
                    label={<Typography.Text strong>Chính sách giá</Typography.Text>}
                >
                    <Select size="middle" value="roor">
                        <Select.Option value="root">Chính sách giá</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="taxApplies"
                    label={<Typography.Text strong>Áp dụng thuế</Typography.Text>}
                >
                    <Select size="middle" value="roor">
                        <Select.Option value="root">Áp dụng thuế</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[32, 0]}>
            <Col span={12}>
                <Form.Item
                    name="paymentDate"
                    label={<Typography.Text strong>Ngày hẹn giao</Typography.Text>}
                >
                    <DatePicker size="middle" style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="staff" label={<Typography.Text strong>Nhân viên</Typography.Text>}>
                    <Input size="middle" />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item name="note" label={<Typography.Text strong>Ghi chú</Typography.Text>}>
            <Input.TextArea autoSize={{ maxRows: 7, minRows: 7 }} placeholder="Hàng dễ vỡ" />
        </Form.Item>
        <Form.Item>
            <Select
                size="middle"
                mode="multiple"
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                style={{ width: '100%' }}
                className="prod-form-properties__select"
                tagRender={({ label, value, disabled, onClose, closable }) => (
                    <Space className="prod-form-properties__tag">
                        <Typography.Text>{label}</Typography.Text>
                        <img src={iconClose} alt="" />
                    </Space>
                )}
            ></Select>
        </Form.Item>
    </Card>
);
export default memo(InventoryFormOrder);
