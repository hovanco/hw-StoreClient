import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Modal, Form, Input, Divider, message } from 'antd';
import { InsaButton } from '../../../components';
import { logout } from '../../../reducers/authState/authAction';
import { changePassword } from '../../../api/user';
import { get } from 'lodash';

import '../style.less';

interface IModalChangePassword {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

enum errMsg {
    PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
}

const ModalChangePassword: FC<IModalChangePassword> = ({ visible, setVisible }) => {
    const dispatch = useDispatch();

    const [formPassword] = Form.useForm();

    const handleChangeNewPassword = async () => {
        try {
            const dataForm = await formPassword.validateFields();
            
            await changePassword({
                currentPassword: dataForm.currentPassword,
                newPassword: dataForm.newPassword,
            });
            message.success('Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!');
            dispatch(logout());
            dispatch(push('/'));
        } catch (error) {
            const errorMessage = get(error.response, 'data.message');
            switch (errorMessage) {
                case errMsg.PASSWORD_INCORRECT: 
                    message.error('Mật khẩu hiện tại không chính xác');
                    break;
                default:
                    message.error('Thay đổi mật khẩu thất bại');
                    break;
            }
        }
    };

    const onCancel = () => {
        formPassword.resetFields();

        setVisible(false);
    }

    return (
        <>
            <Modal
                title={<span>Thay đổi mật khẩu</span>}
                centered
                visible={visible}
                onOk={() => {}}
                okText="Tiếp tục"
                onCancel={() => setVisible(false)}
                cancelText="Dừng lại"
                width={390}
                closable={false}
                maskClosable={true}
                keyboard={false}
                footer={[
                    <InsaButton onClick={onCancel}>Hủy</InsaButton>,
                    <InsaButton type="primary" onClick={handleChangeNewPassword}>
                        Cập nhật
                    </InsaButton>,
                ]}
                className="modal-change-password"
                destroyOnClose
            >
                <Form layout="vertical" form={formPassword}>
                    <Form.Item
                        label="Nhập mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu hiện tại',
                            },
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        dependencies={['currentPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu mới',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('currentPassword') !== value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Mật khẩu mới và mật khẩu cũ không được giống nhau')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Xác nhận mật khẩu mới',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Hai mật khẩu bạn đã nhập không giống nhau!')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password type="password" placeholder="*********" />
                    </Form.Item>
                    <Divider />
                </Form>
            </Modal>
        </>
    );
};

export default ModalChangePassword;
