import { DeleteOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Input, message, Modal, Row, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/lib/typography/Title';
import pick from 'lodash/pick';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import staffsApi from '../../../api/staff-api';
import { BackLink, Loading, PageTopWrapper } from '../../../components';
import rules from '../../../helper/rules';
import { DefaultLayout } from '../../../layout';
import { EUserRole, IStaff } from '../../../models';
import { getUserAction } from '../../../reducers/authState/authAction';
import { IState } from '../../../store/rootReducer';
import { listStaffs } from '../account/components/staff-table';
import RemoveAccount from './components/remove-account';

interface IParams {
    staffId: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    role: EUserRole;
}
const AccountdDetail: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector((state: IState) => state.store.data);
    const user = useSelector((state: IState) => state.auth.user);

    const { staffId } = useParams<IParams>();
    const [loading, setLoading] = useState<boolean>(true);
    const [submiting, setSubmiting] = useState<boolean>(false);
    const [staff, setStaff] = useState<IStaff>();
    const [form] = useForm();

    const loadStaff = useCallback(async (id: string) => {
        try {
            const response = await staffsApi.getStaff(store._id as string, id);

            setStaff(response);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    const onFinish = async (values: FormData) => {
        try {
            setSubmiting(true);

            await staffsApi.updateStaff(store._id as string, staffId as string, {
                ...pick(values, ['name', 'role', 'phoneNo']),
            });

            setStaff({
                _id: staffId,
                ...pick(values, ['name', 'role', 'email', 'phoneNo']),
            });

            if (staffId === user._id) {
                dispatch(getUserAction());
            }

            message.success('Ch???nh s???a th??nh c??ng');
        } catch (error) {
            message.error('L???i ch???nh s???a');
        } finally {
            setSubmiting(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleRemoveStaff = () => {
        Modal.confirm({
            title: 'G??? t??i kho???n',
            icon: <ExclamationCircleOutlined />,
            content: 'B???n ch???c ch???n mu???n x??a nh??n vi??n?',
            okText: 'X??a',
            cancelText: 'H???y',
            onOk: async () => {
                try {
                    await staffsApi.deleteStaff(store._id as string, staffId as string);
                    message.success('???? g??? t??i kho???n th??nh c??ng');
                    history.push('/setting/account');
                } catch (error) {
                    message.error('L???i g??? t??i kho???n');
                } finally {
                }
            },
        });
    };

    useEffect(() => {
        if (staffId) {
            loadStaff(staffId);
        } else {
            setLoading(false);
        }
    }, [staffId]);

    if (loading) {
        return <Loading full />;
    }

    if (!staff) {
        return (
            <DefaultLayout title='Nh??n vi??n kh??ng t???n t???i'>
                <div className='content '>
                    <Card>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description='Nh??n vi??n kh??ng t???n t???i'
                        >
                            <Link to='/setting/account'>
                                <Button type='primary' danger>
                                    Quay l???i
                                </Button>
                            </Link>
                        </Empty>
                    </Card>
                </div>
            </DefaultLayout>
        );
    }

    const title = staff.name.toLowerCase();

    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            initialValues={{ ...pick(staff, ['name', 'phoneNo', 'email', 'role']) }}
        >
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to='/setting/account' text='C??i ?????t t??i kho???n' />

                            <Title level={3}>{title}</Title>
                        </>
                    }
                    rightContent={
                        <Space>
                            <RemoveAccount staffId={staff._id}>
                                <Button
                                    type='primary'
                                    danger
                                    icon={<DeleteOutlined />}
                                    disabled={submiting}
                                    onClick={handleRemoveStaff}
                                >
                                    G??? b??? t??i kho???n
                                </Button>
                            </RemoveAccount>

                            <Button
                                type='primary'
                                htmlType='submit'
                                icon={<SaveOutlined />}
                                loading={submiting}
                            >
                                L??u
                            </Button>
                        </Space>
                    }
                />
                <div className='content'>
                    <Row gutter={15}>
                        <Col span={16}>
                            <Card type='inner' title='H??? s?? nh??n vi??n'>
                                <Row gutter={30}>
                                    <Col span={12}>
                                        <Form.Item
                                            name='name'
                                            label='T??n nh??n vi??n'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui l??ng nh???p T??n nh??n vi??n',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='??i???n t??n nh??n vi??n' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name='email'
                                            label='Email'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui l??ng nh???p Email ',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='??i???n email nh??n vi??n' disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label='S??? ??i???n tho???i'
                                            name='phoneNo'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui l??ng nh???p S??? ??i???n tho???i',
                                                },
                                                {
                                                    pattern: /^(0|\+84)(9|3|7|8|5){1}([0-9]{8})$/g,
                                                    message: 'Vui l??ng nh???p S??? ??i???n tho???i ????ng',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='??i???n s??? ??i???n tho???i nh??n vi??n' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card type='inner' title='Ph??n quy???n vai tr??'>
                                <Form.Item name='role'>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder='Ph??n quy???n cho nh??n vi??n'
                                    >
                                        <Select.Option value='-1' disabled>
                                            Ph??n quy???n cho nh??n vi??n
                                        </Select.Option>
                                        {listStaffs.map((item) => (
                                            <Select.Option
                                                value={item.role}
                                                key={item.role}
                                                disabled={item.role === EUserRole.owner}
                                            >
                                                {item.title}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginTop: 15 }}>
                        <Row gutter={15} justify='end'>
                            <Col>
                                <Button
                                    onClick={() => {
                                        onReset();
                                        history.push('/setting/account');
                                    }}
                                >
                                    H???y
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<SaveOutlined />}
                                    loading={submiting}
                                >
                                    L??u
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </div>
            </DefaultLayout>
        </Form>
    );
};

export default AccountdDetail;
