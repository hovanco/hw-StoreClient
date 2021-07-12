import _ from 'lodash';
import React, { FC, useState } from 'react';
import { Col, Row, Space, Avatar, Form, Input } from 'antd';
import iconKey from '../../../assets/images/ic-security-key.svg';
import { InsaButton } from '../../../components';
import { User } from '../../../reducers/authState/authReducer';
import ModalChangePassword from '../modal-change-password';
import '../style.less';

interface IFormProfile {
    user: User;
    getImageUrl: () => any;
    handleUpload: (e: any) => Promise<void>;
    handleDeleteAvatar: () => void;
    formUser: any;
}

const FormProfile: FC<IFormProfile> = ({ user, getImageUrl, handleUpload, handleDeleteAvatar, formUser }) => {
    const [visible, setVisible] = useState(false);

    return <>
        <Form layout="vertical" form={formUser}>
            <Row>
                <Col span={3} className="avatar">
                    <p>Ảnh đại diện</p>
                    <Avatar size={80} src={getImageUrl()} alt="avatar"/>
                </Col>
                <Col span={21} className="button">
                    <Space size="middle">
                        <div className='btn-upload'>
                            <InsaButton type="primary">
                                Tải ảnh
                            </InsaButton>
                            <input type='file' accept='image/*' onChange={handleUpload} multiple={false} />
                        </div>
                        <InsaButton onClick={handleDeleteAvatar}>
                            Xóa
                        </InsaButton>
                    </Space>
                </Col>
            </Row>
            <br />
            <Row>
                <Col span={11}>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={_.get(user, 'email')}
                    >
                        <Input disabled/>
                    </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        initialValue={_.get(user, 'name')}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNo"
                        initialValue={_.get(user, 'phoneNo')}
                        rules={[
                            {
                                pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                                message: 'Số điện thoại không đúng',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="security-text">+ Bảo mật</p>
                    <InsaButton
                        icon={
                            <img
                                style={{ marginRight: 10 }}
                                src={iconKey}
                                alt="icon"
                            />
                        }
                        className="security-button"
                        onClick={() => setVisible(true)}
                    >
                        Thay đổi mật khẩu
                    </InsaButton>
                </Col>
            </Row>
        </Form>
        <ModalChangePassword visible={visible} setVisible={setVisible} />
    </>
};

export default FormProfile;
