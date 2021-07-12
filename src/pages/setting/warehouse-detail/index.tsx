import { Button, Card, Col, Empty, Form, Input, message, Row, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import { map, pick } from 'lodash';
import { default as React, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import warehouseApi from '../../../api/warehouse-api';
import { BackLink, Loading, PageTopWrapper } from '../../../components';
import { disabledAutosuggestion } from '../../../helper';
import rules from '../../../helper/rules';
import {
    District,
    Province,
    useDistricts,
    useProvices,
    useWards,
    Ward,
} from '../../../hook/useLocation';
import { DefaultLayout } from '../../../layout';
import { EUserRole, IWarehouse } from '../../../models';
import { IState } from '../../../store/rootReducer';
import types from '../../../reducers/storeState/type';
import RemoveWarehouse from './components/remove-warehouse';

interface IParams {
    warehouseId?: string;
}

interface FormData {
    name: string;
    phoneNo: string;
    province: string;
    district: string;
    ward: string;
    address: string;
}

const WarehouseDetail: FC = () => {
    const store = useSelector((state: IState) => state.store.data);
    const warehouses = useSelector((state: IState) => state.store.warehouses);
    const dispatch = useDispatch();
    const [form] = useForm();

    const { warehouseId } = useParams<IParams>();

    const [warehouse, setWarehouse] = useState<IWarehouse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [province, setProvince] = useState<string | undefined>(warehouse?.province);
    const [district, setDistrict] = useState<string | undefined>(warehouse?.district);

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (value: string) => {
        setProvince(value);

        removeField('district');
    };

    const onChangeDistrict = (value: string) => {
        setDistrict(value);

        removeField('ward');
    };

    const removeField = (field: string) => {
        form.setFieldsValue({
            [field]: undefined,
        });
    };

    const resetForm = () => {
        form.resetFields();
    };

    const onFinish = async (values: FormData) => {
        try {
            const response = await warehouseApi.editWarehouse(
                store._id as string,
                warehouse?._id as string,
                values,
            );

            message.success('Sửa chi nhánh thành công');

            setWarehouse(response);

            const newWarehouses = warehouses.map((item) => {
                if (item._id === response._id) {
                    return response;
                }
                return item;
            });

            dispatch({
                type: types.SET_WAREHOUSES,
                payload: newWarehouses,
            });
        } catch (error) {
            message.error('Lỗi sửa chi nhánh');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function getWarehouse(warehouseId: string) {
            try {
                setLoading(true);
                const response = await warehouseApi.getWarehouse(store._id as string, warehouseId);

                setWarehouse(response);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        if (warehouseId) {
            getWarehouse(warehouseId);
        } else {
            setLoading(false);
        }
    }, [store._id, warehouseId]);

    useEffect(() => {
        if (warehouse) {
            setProvince(warehouse.province);
            setDistrict(warehouse.district);
        }
    }, [warehouse]);

    if (loading) {
        return <Loading full />;
    }
    
    if (!warehouse) {
        return (
            <DefaultLayout title='Không tìm thấy chi nhánh'>
                <div className='content'>
                    <Card>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description='Không tìm thấy chi nhánh'
                        >
                            <Link to='/setting/warehouse'>
                                <Button type='primary' danger>
                                    Quay lại
                                </Button>
                            </Link>
                        </Empty>
                    </Card>
                </div>
            </DefaultLayout>
        );
    }

    const title = warehouse.name.toUpperCase();

    const initialValues = {
        ...pick(warehouse, ['name', 'phoneNo', 'province', 'district', 'ward', 'address']),
    };

    return (
        <Form onFinish={onFinish} layout='vertical' initialValues={initialValues} form={form}>
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to='/setting/warehouse' text='Danh sách chi nhánh' />
                            <Title level={3}>{title}</Title>
                        </>
                    }
                    rightContent={
                        <Space>
                            <Button href='/setting/warehouse'>Hủy</Button>
                            <Button type='primary' htmlType='submit'>
                                Lưu
                            </Button>
                        </Space>
                    }
                />
                <div className='content'>
                    <Row justify='center'>
                        <Col md={18}>
                            <Card
                                title='Thông tin chi nhánh'
                                type='inner'
                                style={{ marginBottom: 20 }}
                            >
                                <Form.Item
                                    name='name'
                                    label='Tên chi nhánh'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Tên chi nhánh',
                                        },
                                        {
                                            max: 255,
                                            message: 'Tên chi nhánh quá dài',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Điền tên chi nhánh' />
                                </Form.Item>

                                <Form.Item
                                    name='phoneNo'
                                    label='Số điện thoại'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Số điện thoại',
                                        },

                                        {
                                            validator: rules.validatePhone,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Điền số điện thoại chi nhánh' />
                                </Form.Item>

                                <Row gutter={15}>
                                    <Col span={8}>
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
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                                loading={loadingProvince}
                                                onFocus={disabledAutosuggestion}
                                                placeholder='Chọn tỉnh/thành phố'
                                            >
                                                <Select.Option value={'-1'} key={'-1'} disabled>
                                                    Chọn tỉnh/thành phố
                                                </Select.Option>

                                                {map(provinces, (province: Province) => (
                                                    <Select.Option
                                                        value={province.code}
                                                        key={province.code}
                                                    >
                                                        {province.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name='district'
                                            label='Quận/huyện'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Chọn quận/huyện',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder='Chọn quận/huyện'
                                                onChange={onChangeDistrict}
                                                showSearch
                                                filterOption={(input, option: any) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                                disabled={!province}
                                                loading={loadingDistrict}
                                                onFocus={disabledAutosuggestion}
                                            >
                                                <Select.Option value={'-1'} key={'-1'} disabled>
                                                    Chọn quận/huyện
                                                </Select.Option>
                                                {map(districts, (district: District) => (
                                                    <Select.Option
                                                        value={district.code}
                                                        key={district.code}
                                                    >
                                                        {district.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name='ward'
                                            label='Xã/phường'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Chọn xã/phường',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder='Chọn xã/phường'
                                                showSearch
                                                filterOption={(input, option: any) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                                disabled={!district}
                                                loading={loadingWard}
                                                onFocus={disabledAutosuggestion}
                                            >
                                                <Select.Option value={'-1'} key={'-1'} disabled>
                                                    Chọn xã/phường
                                                </Select.Option>
                                                {map(wards, (ward: Ward) => {
                                                    return (
                                                        <Select.Option
                                                            value={ward.code}
                                                            key={ward.code}
                                                        >
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
                                    label='Địa chỉ'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Địa chỉ chi nhánh',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={3} placeholder='Điền địa chỉ chi nhánh' />
                                </Form.Item>
                            </Card>

                            <Space style={{ float: 'right' }}>
                                <Button href='/setting/warehouse'>Hủy</Button>
                                <Button type='primary' htmlType='submit'>
                                    Lưu
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </DefaultLayout>
        </Form>
    );
};

export default WarehouseDetail;
