import _ from 'lodash';
import { Col, Row, Space, Typography, Card, message, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import iconQuestion from '../../assets/images/ic-question.svg';
import { InsaButton, PageTopWrapper } from '../../components';
import { DefaultLayout } from '../../layout';
import { IStorageState } from '../../reducers/authState/authReducer';
import theme from '../../theme';
import constants from '../../constants';
import { IState } from '../../store/rootReducer';
import { uploadImagesRequest } from '../../api/upload-api';
import FormProfile from './form-profile';
import { updateUserInfo } from '../../api/user';
import { loadUserSuccess } from '../../reducers/authState/authAction';
import './style.less';

function SettingProfilePage() {
    const user = useSelector(({ auth }: { auth: IStorageState }) => auth.user);
    const token = useSelector((state: IState) => state.auth.token);
    const { data: storeObj } = useSelector((state: IState) => state.store);

    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState<string>(() => _.get(user, 'picture', ''));

    const [fileImage, setFileImage] = useState<any>();

    const [formUser] = Form.useForm();

    const getImageUrl = (): string => {
        if (fileImage && typeof fileImage === 'string') {
            return `${constants.URL_IMG}${fileImage}`;
        }
        return avatar;
    };

    const handleUpload = async (e: any) => {
        try {
            const files = Array.from(e.target.files).map((file: any) => {
                return file;
            });
            e.target.value = null;

            if (!files) {
                return;
            }

            const accessToken = _.get(token, 'accessToken');

            const res = await uploadImagesRequest({
                token: accessToken,
                storeId: storeObj._id as string,
                files,
            });

            if (Array.isArray(res)) {
                setFileImage(res[0].key)
            }
        } catch (error) {}
    };

    const handleDeleteAvatar = () => {
        setFileImage('');
        setAvatar('');
    }

    const handleSaveProfile = async () => {
        try {
            console.log(fileImage);
            const dataForm = formUser.getFieldsValue();
            console.log(dataForm);
            const newData = {
                name: dataForm.name,
                picture: fileImage ? `${constants.URL_IMG}${fileImage}` : avatar,
                phoneNo: dataForm.phoneNo,
            };
            await updateUserInfo(newData);
            dispatch(loadUserSuccess({ ...user, ...newData }));
            message.success('C???p nh???t th??ng tin t??i kho???n th??nh c??ng');
        } catch (error) {
            message.error('C???p nh???t th??ng tin t??i kho???n th???t b???i')
        }
    }

    return (
        <DefaultLayout title="T??I KHO???N C???A T??I">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>T??I KHO???N C???A T??I</Typography.Title>}
                rightContent={
                    <Space>
                        {/* <InsaButton type="primary" danger
                            icon={
                                <img
                                    style={{ marginRight: 10 }}
                                    src={iconTrash}
                                    alt="icon"
                                />
                            }
                        >
                            G??? t??i kho???n
                        </InsaButton> */}
                        <InsaButton type="primary" style={{ width: 80 }} onClick={handleSaveProfile}>
                            L??u
                        </InsaButton>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton
                            icon={
                                <img
                                    style={{ marginRight: 10 }}
                                    src={iconQuestion}
                                    alt="icon"
                                />
                            }
                        >
                            Tr??? gi??p
                        </InsaButton> */}
                    </Space>
                }
            />

            <Row
                style={{
                    padding: theme.spacing.m,
                }}
                justify='center'
            >
                <Col span={20}>
                    <Card
                        type="inner"
                        title={
                            <span style={{ fontSize: 16 }}>Th??ng tin t??i kho???n</span>
                        }
                        className="setting-profile"
                    >
                        <FormProfile
                            user={user}
                            formUser={formUser}
                            getImageUrl={getImageUrl}
                            handleUpload={handleUpload}
                            handleDeleteAvatar={handleDeleteAvatar}
                        />
                    </Card>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default SettingProfilePage;
