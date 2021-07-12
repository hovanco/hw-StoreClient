import React, { FC } from 'react';

import { useStaffs } from '../../../../hook/useStaff';
import { IStaff } from '../../../../models';

import { Form, Input, Select, Card, Space, Typography } from 'antd';

const OtherInfo: FC = () => {
    const { staffs, loading, getStaffById } = useStaffs();

    return (
        <Card title="Thông tin khác">
            {/* TODO: Show after add feature */}
            {/* <Form.Item label="Nhân viên phụ trách" name="employee">
                <Select
                    loading={loading}
                    placeholder="Chọn nhân viên"
                    showSearch
                    filterOption={(input, option: any) => {
                        let staff = getStaffById(option.value);

                        if (!staff) return false;

                        return (
                            staff.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                            staff.email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        );
                    }}
                    className="select-staff"
                >
                    {staffs.map((staff: IStaff) => (
                        <Select.Option key={staff._id} value={staff._id}>
                            <Space style={{ padding: 5, paddingLeft: 0 }}>
                                <Typography.Text>{staff.name}</Typography.Text>
                                <Typography.Text type="secondary">{staff.email}</Typography.Text>
                            </Space>
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item label="Mô tả" name="description">
                <Input.TextArea />
            </Form.Item>
            {/* <Form.Item label="Tag" name="tag">
                <Input.TextArea />
            </Form.Item> */}
        </Card>
    );
};

export default OtherInfo;
