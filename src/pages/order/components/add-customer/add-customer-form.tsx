import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import { get, map } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import customerApi from '../../../../api/customer-api';
import { disabledAutosuggestion } from '../../../../helper';
import { useDistricts, useProvices, useWards } from '../../../../hook/useLocation';
import { useOrderNew } from '../../create/state/context';
import { useAddCustomer } from './context';
import { District, Province, Ward } from './interface';

interface Props {
    toggle?: () => void;
}

const AddCustomerForm: FC<Props> = ({ toggle }) => {
    const store = useSelector((state: any) => state.store.data);

    const { source } = useOrderNew();
    const { selectCustomer } = useAddCustomer();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false);
    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (e: string) => {
        setProvince(e);

        removeField('district');
        removeField('ward');
    };

    const onChangeDistrict = (e: string) => {
        setDistrict(e);

        removeField('ward');
    };

    const removeField = (field: string) => {
        form.setFieldsValue({
            [field]: undefined,
        });
    };

    const onSubmit = async (values: Store) => {
        try {
            setLoading(true);

            const { name, email, phoneNo, address, province, district, ward } = values;

            const customer = await customerApi.createCustomer({
                storeId: store._id,
                formData: {
                    name,
                    email,
                    phoneNo,
                    address,
                    province,
                    district,
                    ward,
                    source,
                },
            });

            message.success('Đã tạo khách hàng thành công');
            selectCustomer(customer);
            toggle && toggle();
        } catch (error) {
            if (get(error, 'response.status') === 409) {
                message.error('Số điện thoại đã tồn tại');
            } else {
                message.error('Xảy ra lỗi, vui lòng thử lại');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout='vertical' onFinish={onSubmit} form={form}>
            <Row gutter={15}>
                <Col span={12}>
                    <Form.Item
                        label='Tên khách hàng'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng nhập Tên' }]}
                    >
                        <Input placeholder='Điền tên khách hàng' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label='Số điện thoại'
                        name='phoneNo'
                        rules={[
                            { required: true, message: 'Vui lòng nhập Số điện thoại' },

                            {
                                pattern: new RegExp(/^(0|\+84)(9|3|7|8|5){1}([0-9]{8})$/g),
                                message: 'Số điện thoại không đúng',
                            },
                        ]}
                    >
                        <Input placeholder='Điền số điện thoại' />
                    </Form.Item>
                </Col>

                {/* <Col span={12}>
                    <Form.Item label='Ngày sinh'>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col> */}

                <Col span={12}>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ type: 'email', message: 'Vui lòng nhập Email hợp lệ' }]}
                    >
                        <Input placeholder='Điền email' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label='Tỉnh/Thành phố'
                        name='province'
                        rules={[{ required: true, message: 'Chọn tỉnh/thành phố ' }]}
                    >
                        <Select
                            placeholder='Chọn tỉnh/thành phố'
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp='children'
                            onChange={onChangeProvince}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingProvince}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(provinces, (province: Province) => (
                                <Select.Option value={province.code} key={province.code}>
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label='Quận/Huyện'
                        name='district'
                        rules={[{ required: true, message: 'Chọn qnận huyện' }]}
                    >
                        <Select
                            placeholder='Chọn xã/phường'
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp='children'
                            onChange={onChangeDistrict}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingDistrict}
                            disabled={!province}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(districts, (district: District) => (
                                <Select.Option value={district.code} key={district.code}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label='Xã/Phường'
                        name='ward'
                        rules={[{ required: true, message: 'Điền tên xã phường' }]}
                    >
                        <Select
                            placeholder='Chọn xã/phường'
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!province || !district}
                            loading={loadingWard}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(wards, (ward: Ward) => (
                                <Select.Option value={ward.code} key={ward.code}>
                                    {ward.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label='Địa chỉ khách hàng'
                        name='address'
                        rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ' }]}
                    >
                        <TextArea placeholder='Điền địa chỉ khách hàng' />
                    </Form.Item>
                </Col>
            </Row>

            <Row align='middle' justify='end' gutter={15}>
                <Col>
                    <Button disabled={loading} onClick={toggle}>
                        Hủy
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AddCustomerForm;
