import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { get, map, pick } from 'lodash';
import * as queryString from 'querystring';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import storeApi, { IDataCreateStore } from '../../api/store-api';
import { updateUserStorePreference } from '../../api/user-store-preference-api';
import { Loading } from '../../components';
import { disabledAutosuggestion, validChannel } from '../../helper';
import rules from '../../helper/rules';
import { useDistricts, useProvices, useWards } from '../../hook/useLocation';
import { SaleChannelId } from '../../models';
import types from '../../reducers/storeState/type';
import { IState } from '../../store/rootReducer';
import { District, Province, Ward } from './interface';
const { createStore, updateStore } = storeApi;

export enum ETypeForm {
    NEW = '1',
    EDIT = '2',
}
interface Props {
    type?: ETypeForm;
}

const size = 'large';
const style = { width: '100%' };

const FormCreateStore: FC<Props> = ({ type = ETypeForm.NEW }) => {
    const dispatch = useDispatch();
    const store = useSelector((state: IState) => state.store.data);
    const [form] = useForm();
    const location = useLocation();
    const [, forceUpdate] = useState({});

    const [progress, setProgress] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const [province, setProvince] = useState<string | undefined>(() => {
        if (store) {
            return store.province as string;
        }
        return undefined;
    });

    const [district, setDistrict] = useState<string | undefined>(() => {
        if (store) {
            return store.district as string;
        }
        return undefined;
    });

    const [ward, setWard] = useState<string | undefined>(() => {
        if (store) {
            return store.ward as string;
        }
        return undefined;
    });

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province, true);
    const { loadingWard, wards } = useWards({ province, district, loading: true });

    const onChangeProvince = (value: string) => {
        setProvince(value);
        setDistrict(undefined);
        setWard(undefined);
        removeField('district');
        removeField('ward');
    };

    const onChangeDistrict = (value: string) => {
        setDistrict(value);
        setWard(undefined);
        removeField('ward');
    };

    const onChangeWard = (value: string) => {
        setWard(value);
    };

    const removeField = (field: string) => {
        form.setFieldsValue({
            [field]: undefined,
        });
    };

    const createNewStore = async (values: IDataCreateStore) => {
        try {
            if (localStorage.getItem('shortLiveToken') !== null)
                values.saleChannels = [SaleChannelId.FACEBOOK];

            const querySearch: {
                saleChannel?: SaleChannelId;
            } = queryString.parse(location.search.replace('?', ''));

            let data = values;

            if (querySearch.saleChannel && validChannel(querySearch.saleChannel)) {
                data = {
                    ...values,
                    saleChannels: [querySearch.saleChannel],
                };
            }

            const result = await createStore(data);

            await updateUserStorePreference({
                storeId: result._id,
                hideNewUserGuide: false,
            });

            dispatch({
                type: types.SET_STORE,
                payload: result,
            });
        } catch (error) {
            if (get(error, 'response.status') === 409) {
                return message.error('Tên cửa hàng đã tồn tại. Vui lòng nhập tên khác');
            }
            return message.error('Lỗi tạo cửa hàng');
        } finally {
            setLoading(false);
        }
    };

    const editStore = async (values: IDataCreateStore) => {
        try {
            const result = await updateStore(store._id as string, {
                ...values,
            });

            dispatch({
                type: types.SET_STORE,
                payload: result,
            });
        } catch (error) {
            message.error('Lỗi chỉnh sửa cửa hàng');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (values: IDataCreateStore) => {
        setLoading(true);
        if (type === ETypeForm.NEW) {
            createNewStore(values);
        } else {
            editStore(values);
        }
        form.resetFields();
    };

    useEffect(() => {
        if (
            (!loadingDistrict && !loadingWard && type === ETypeForm.EDIT) ||
            type === ETypeForm.NEW
        ) {
            setProgress(false);
        }
    }, [loadingDistrict, loadingWard, type]);

    useEffect(() => {
        forceUpdate({});
    }, []);

    if (progress) {
        return (
            <div style={{ height: 320 }}>
                <Loading full />
            </div>
        );
    }

    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            initialValues={{
                ...pick(store, ['name', 'phoneNo', 'address', 'province', 'district', 'ward']),
            }}
        >
            <Form.Item
                name='name'
                label='Tên cửa hàng'
                rules={[{ required: true, message: 'Vui lòng nhập Tên cửa hàng' }]}
            >
                <Input size={size} placeholder='Tên cửa hàng' autoFocus />
            </Form.Item>

            <Form.Item
                name='phoneNo'
                label='Số điện thoại'
                rules={[
                    { required: true, message: 'Vui lòng nhập Số điện thoại' },
                    {
                        validator: rules.validatePhone,
                    },
                ]}
            >
                <Input style={style} size={size} placeholder='Số điện thoại cửa hàng' />
            </Form.Item>

            <Row gutter={15}>
                <Col md={8}>
                    <Form.Item
                        name='province'
                        label='Tỉnh/thành phố'
                        rules={[
                            {
                                required: true,
                                message: 'Chọn tỉnh/thành phố',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp='children'
                            onChange={onChangeProvince}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingProvince}
                            onFocus={disabledAutosuggestion}
                            placeholder='Chọn tỉnh/thành phố'
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Chọn tỉnh/thành phố
                            </Select.Option>

                            {map(provinces, (province: Province) => (
                                <Select.Option value={province.code} key={province.code}>
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col md={8}>
                    <Form.Item
                        name='district'
                        label='Quận/huyện'
                        rules={[{ required: true, message: 'Chọn quận/huyện' }]}
                    >
                        <Select
                            size={size}
                            placeholder='Chọn quận/huyện'
                            onChange={onChangeDistrict}
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!province}
                            loading={loadingDistrict}
                            onFocus={disabledAutosuggestion}
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Chọn quận/huyện
                            </Select.Option>
                            {map(districts, (district: District) => (
                                <Select.Option value={district.code} key={district.code}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col md={8}>
                    <Form.Item
                        name='ward'
                        label='Xã/phường'
                        rules={[{ required: true, message: 'Chọn xã/phường' }]}
                    >
                        <Select
                            size={size}
                            placeholder='Chọn xã/phường'
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!district}
                            loading={loadingWard}
                            onFocus={disabledAutosuggestion}
                            onChange={onChangeWard}
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Chọn xã/phường
                            </Select.Option>
                            {map(wards, (ward: Ward) => {
                                return (
                                    <Select.Option value={ward.code} key={ward.code}>
                                        {ward.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name='address'
                rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ' }]}
                label='Địa chỉ'
            >
                <Input.TextArea
                    autoComplete='off'
                    placeholder='Điền địa chỉ cửa hàng'
                    rows={3}
                ></Input.TextArea>
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => {
                    const notValidProvice = !province;
                    const notValiddistrict = !district;
                    const notValidWard = !ward;

                    const isValidFied =
                        type === ETypeForm.NEW
                            ? JSON.stringify(form.getFieldsValue()) === '{}' ||
                              !form.isFieldsTouched(true) ||
                              !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            : JSON.stringify(form.getFieldsValue()) === '{}' ||
                              !!form.getFieldsError().filter(({ errors }) => errors.length).length;

                    const disabled =
                        isValidFied || notValidProvice || notValiddistrict || notValidWard;

                    return (
                        <Button
                            type='primary'
                            size={size}
                            htmlType='submit'
                            block
                            disabled={disabled}
                        >
                            {type === ETypeForm.EDIT ? 'Chỉnh sửa cửa hàng' : 'Tạo cửa hàng'}
                        </Button>
                    );
                }}
            </Form.Item>
        </Form>
    );
};

export default FormCreateStore;
