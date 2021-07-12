import { Card, Col, Form, Input, Row, Select } from 'antd';
import React, { FC } from 'react';

interface Props {}

const CustomerInfo: FC<Props> = () => {
    return (
        <Card title='Thông tin khách hàng'>
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item
                        label='Tên khách hàng'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng nhập Tên khách hàng' }]}
                    >
                        <Input placeholder='' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='Nhóm khách hàng' name='source'>
                        <Select placeholder='Chọn nhóm khách hàng' disabled>
                            <Select.Option value='facebook'>Facebook</Select.Option>
                            <Select.Option value='pos'>Pos</Select.Option>
                            <Select.Option value='shopee'>Shopee</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                {/* <Col span={12}>
                    <Form.Item
                        label="Mã khách hàng"
                        name="code"
                        rules={[{ required: true, message: 'Nhập mã khách hàng' }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col> */}
                <Col span={12}>
                    <Form.Item
                        label='Số điện thoại'
                        name='phoneNo'
                        rules={[
                            { required: true, message: 'Vui lòng nhập Số điện thoại' },
                            {
                                pattern: /^(0|\+84)(9|3|7|8|5){1}([0-9]{8})$/g,
                                message: 'Vui lòng nhập Số điện thoại đúng',
                            },
                        ]}
                    >
                        <Input placeholder='' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ type: 'email', message: 'Vui lòng nhập Email hợp lệ' }]}
                    >
                        <Input placeholder='' />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default CustomerInfo;
