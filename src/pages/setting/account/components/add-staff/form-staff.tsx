import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { pick, every, isNil } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import staffsApi from '../../../../../api/staff-api';
import { EUserRole, IStaff } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useStaffs } from '../../state';
import { listStaffs } from '../staff-table';

export enum EFormStaff {
    edit = 1,
    new,
}

interface Props {
    toggle?: Function;
    type?: EFormStaff;
    staff?: IStaff;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    role: EUserRole;
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const requiredFields = ['name', 'email', 'password', 'role'];

const FormStaff: FC<Props> = ({ toggle, staff, type = EFormStaff.new }) => {
    const { loadStaffs } = useStaffs();
    const [form] = useForm();
    const store = useSelector((state: IState) => state.store.data);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(!staff);

    const isEdit = type === EFormStaff.edit;

    const createStaff = async (values: FormData) => {
        try {
            setLoading(true);

            await staffsApi.createStaff(store._id as string, values);
            loadStaffs(store._id);

            if (toggle) {
                toggle();
            }

            message.success('Tạo nhân viên mới thành công');
        } catch (error) {
            message.error('Lỗi tạo nhân viên mới');
        } finally {
            setLoading(false);
        }
    };

    const editStaff = async (values: FormData) => {
        try {
            setLoading(true);

            await staffsApi.updateStaff(store._id as string, staff?._id as string, values);

            if (toggle) {
                toggle();
            }

            loadStaffs(store._id);

            message.success('Chỉnh sửa nhân viên thành công');
        } catch (error) {
            message.error('Lỗi chỉnh sửa nhân viên');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: FormData) => {
        if (isEdit) {
            editStaff(values);
        } else {
            createStaff(values);
        }
    };

    const resetForm = () => {
        form.resetFields();
        if (toggle) {
            toggle();
        }
    };

    const onFieldsChange = (changedFields: FieldData[], allFields: FieldData[]) => {
        const fields = allFields.filter((field: FieldData) =>
            requiredFields.includes((field.name as string[])[0]),
        );

        const result = every(
            fields,
            (field: FieldData) => field.errors?.length === 0 && !isNil(field.value),
        );

        setDisabled(!result);
    };

    const initialValues = isEdit
        ? {
              ...pick(staff, ['name', 'role']),
          }
        : { role: 2 };

    const listStaffRoleSelect = listStaffs.filter((item) => item.role !== EUserRole.owner);

    return (
        <Form
            onFinish={onFinish}
            initialValues={initialValues}
            layout='vertical'
            form={form}
            onFieldsChange={onFieldsChange}
        >
            {!isEdit && (
                <Form.Item
                    name='email'
                    label='Email'
                    validateTrigger={['onBlur', 'onChange']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Email ',
                        },
                        {
                            type: 'email',
                            message: 'Vui lòng nhập Email hơp lệ',
                        },
                    ]}
                >
                    <Input placeholder='Điền địa chỉ email' />
                </Form.Item>
            )}

            {!isEdit && (
                <Form.Item
                    name='password'
                    validateTrigger={['onBlur', 'onChange']}
                    label='Mật khẩu'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Mật khẩu ',
                        },
                        {
                            min: 6,
                            message: 'Vui lòng nhập mật khẩu phải chứa tối thiểu 6 ký tự',
                        },
                        {
                            max: 15,
                            message: 'Vui lòng nhập Mật khẩu nhỏ hơn 15 kí tự',
                        },
                    ]}
                >
                    <Input.Password placeholder='Điền mật khẩu' />
                </Form.Item>
            )}

            {isEdit ? (
                <Form.Item name='name' label='Tên nhân viên'>
                    <Input placeholder='Điền tên nhân viên' />
                </Form.Item>
            ) : (
                <Form.Item
                    name='name'
                    label='Tên nhân viên'
                    validateTrigger={['onBlur', 'onChange']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Tên nhân viên',
                        },
                    ]}
                >
                    <Input placeholder='Điền tên nhân viên' />
                </Form.Item>
            )}

            {isEdit ? (
                <Form.Item name='role' label='Chức vụ'>
                    <Select>
                        {listStaffRoleSelect.map((item) => (
                            <Select.Option
                                key={item.role}
                                value={item.role}
                                disabled={item.role === EUserRole.owner}
                            >
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            ) : (
                <Form.Item
                    name='role'
                    label='Chức vụ'
                    validateTrigger={['onBlur', 'onChange']}
                    rules={[
                        {
                            required: true,
                            message: 'Chọn chức vụ',
                        },
                    ]}
                >
                    <Select>
                        {listStaffRoleSelect.map((item) => (
                            <Select.Option
                                key={item.role}
                                value={item.role}
                                disabled={item.role === EUserRole.owner}
                            >
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}

            <Form.Item>
                <Row justify='end' gutter={15}>
                    <Col>
                        <Button onClick={resetForm}>Hủy</Button>
                    </Col>
                    <Col>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            disabled={disabled}
                        >
                            Lưu
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default FormStaff;
