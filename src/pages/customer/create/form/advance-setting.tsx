import React, { FC } from 'react';

import { Form, Radio, Select, Input, Card, Space } from 'antd';

const AdvanceSetting: FC = () => {
    return (
        <Card title="Thông tin đơn hàng">
            <Form.Item>
                <p>Áp dụng ưu đãi</p>
                <Radio.Group defaultValue={1}>
                    <Space direction="vertical">
                        <Radio value={1}>Theo nhóm khách hàng</Radio>
                        <Radio value={2}>Theo khách hàng</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {/* TODO: Show after add feature */}
            {/* <Form.Item label="Giá mặc định">
                <Select placeholder="Chọn giá mặc định"></Select>
            </Form.Item>
            <Form.Item label="Thuế mặc định">
                <Select placeholder="Chọn thuế mặc định"></Select>
            </Form.Item>
            <Form.Item label="Chiết khấu (%)">
                <Input placeholder="" value="0" style={{ textAlign: 'left' }}></Input>
            </Form.Item>
            <Form.Item label="Hình thức thanh toán">
                <Select placeholder="Chọn hình thức"></Select>
            </Form.Item> */}
        </Card>
    );
};

export default AdvanceSetting;
