import React, { FC } from 'react';
import moment from 'moment';
import { Row, Col, Form, Input, DatePicker, Select, Card } from 'antd';
import { Gender } from '../../../../constants/gender';
import { regexWebsite } from '../../../../helper/regexs';

const disabledDate = (current: any) => {
    return current && current > moment();
}

const AdditionalInfo: FC = () => {
    return (
        <Card title="Thông tin bổ sung">
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item label="Ngày sinh" name="dateOfBirth">
                        <DatePicker
                            style={{ width: '100%' }}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Giới tính" name="gender">
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value={Gender.MALE}>Nam</Select.Option>
                            <Select.Option value={Gender.FEMALE}>Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item
                        name="website"
                        label="Website"
                        normalize={(value):string => value.trim()}
                        rules={[
                            {
                                pattern: regexWebsite,
                                message: 'Website không hợp lệ'
                            }
                        ]}
                        >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="taxCode" label="Mã số thuế">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default AdditionalInfo;
