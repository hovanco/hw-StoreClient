import { Button, Card, Col, Form, message, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';
import { pick } from 'lodash';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storeApi from '../../../api/store-api';
import { Loading } from '../../../components';
import types from '../../../reducers/storeState/type';
import { IState } from '../../../store/rootReducer';
import AddressMain from './components/address-main';
import InforShop from './components/infor-shop';
import OtherInfor from './components/other-infor';
import './style.less';

interface Props {}

const GeneralInformationContent: FC<Props> = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const loadingStore = useSelector((state: IState) => state.store.loadingStore);
    const store = useSelector((state: IState) => state.store.data);
    const [form] = useForm();

    const onFinish = async (values: Store) => {
        if (store._id) {
            try {
                setLoading(true);
                const response = await storeApi.updateStore(store._id, values);

                dispatch({
                    type: types.SET_STORE,
                    payload: response,
                });
                message.success('Cập nhật thành công');
            } catch (error) {
                const errorStatus = error.response.status;
                message.error(
                    errorStatus === 403
                        ? 'Người dùng không có quyền cập nhật những thông tin này của cửa hàng'
                        : 'Xảy ra lỗi, vui lòng thử lại',
                );
            } finally {
                setLoading(false);
            }
        }
    };

    if (loadingStore) {
        return <Loading full />;
    }

    const initialValues = pick(store, [
        'name',
        'phoneNo',
        'email',
        'fax',
        'businessType',
        'address',
        'province',
        'district',
        'ward',
    ]);

    return (
        <Form layout='vertical' initialValues={initialValues} onFinish={onFinish} form={form}>
            <Row gutter={16}>
                <Col span={16} className='infor-shop-address'>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Card
                                type='inner'
                                title='Thông tin cửa hàng'
                                bordered={false}
                                className='card-custom infor-shop'
                            >
                                <InforShop />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                type='inner'
                                title='Địa chỉ chính'
                                bordered={false}
                                className='card-custom address-main'
                            >
                                <AddressMain {...pick(store, ['province', 'district', 'ward'])} />
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col span={8} className='other-infor'>
                    <Card
                        title='Thông tin khác'
                        type='inner'
                        bordered={false}
                        className='card-custom'
                    >
                        <OtherInfor />
                    </Card>
                </Col>
            </Row>

            <Row justify='end' style={{ marginTop: 15 }}>
                <Col>
                    <Space style={{ float: 'right' }}>
                        <Button style={{ width: '120px' }} href='/setting'>
                            Hủy
                        </Button>
                        <Button style={{ width: '120px' }} type='primary' htmlType='submit'>
                            Lưu
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

export default GeneralInformationContent;
