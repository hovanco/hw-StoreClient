import { Card, Col, Form, Input, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { map } from 'lodash';
import React, { FC, useState } from 'react';
import { disabledAutosuggestion } from '../../../../helper';
import { useDistricts, useProvices, useWards } from '../../../../hook/useLocation';
import { District, Province, Ward } from '../../../create-store/interface';

interface Props {
    form: FormInstance;
}

const AddressInfo: FC<Props> = ({ form }) => {
    const [province, setProvince] = useState<string | undefined>(form.getFieldValue('province'));
    const [district, setDistrict] = useState<string | undefined>(form.getFieldValue('district'));

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (value: string) => {
        setProvince(value);

        removeField('district');
        removeField('ward');
        setDistrict(undefined);
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

    return (
        <Card title="Thông tin địa chỉ">
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item name="label" label="Nhãn">
                        <Input placeholder="Ví dụ: Nơi thanh toán, nơi giao hàng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="province" label="Tỉnh/thành phố">
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={onChangeProvince}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingProvince}
                            onFocus={disabledAutosuggestion}
                            placeholder="Chọn tỉnh/thành phố"
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
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item name="district" label="Quận/huyện">
                        <Select
                            placeholder="Chọn quận/huyện"
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
                <Col span={12}>
                    <Form.Item name="ward" label="Xã/phường">
                        <Select
                            placeholder="Chọn xã/phường"
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                                    <Select.Option value={ward.code} key={ward.code}>
                                        {ward.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 0]}>
                <Col span={12}>
                    <Form.Item label="Địa chỉ" name="address">
                        <Input placeholder="Nhập địa chỉ khách hàng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Địa chỉ 2" name="address2">
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default AddressInfo;
