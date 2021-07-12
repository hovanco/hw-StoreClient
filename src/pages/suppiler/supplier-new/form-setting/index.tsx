import { Card, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { FC, memo } from 'react';
import iconClose from '../../../../assets/images/ic-close.svg';

const SupplierFormSetting: FC = () => {
    return (
        <Card size="default" title={<Typography.Text strong>Cài đặt nâng cao</Typography.Text>}>
            <Form.Item label="Hình thức thanh toán" name="paymentMethod">
                <Select placeholder="Chuyển khoản"></Select>
            </Form.Item>
            <Row gutter={[32, 0]}>
                <Col span={12}>
                    <Form.Item label="Chính sách giá" name="pricingPolicy">
                        <Select placeholder="Giá nhập"></Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Áp dụng thuế" name="taxApplies">
                        <Select placeholder="Giá chưa gồm thuế"></Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Nhân viên" name="staff">
                        <Input placeholder="10.000" />
                    </Form.Item>
                    <Form.Item label="Ghi chú" name="note">
                        <Input.TextArea placeholder="10.000" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Phường/ Xã" name="provice">
                        <Select placeholder="Phường/ xã"></Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="tag" label="TAG">
                        <Select
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
                </Col>
            </Row>
        </Card>
    );
};

export default memo(SupplierFormSetting);
