import { Col, Form, Input, Row, Select } from 'antd';
import { map } from 'lodash';
import React, { FC, useState } from 'react';
import { disabledAutosuggestion } from '../../../../../helper';
import {
    District,
    Province,
    useDistricts,
    useProvices,
    useWards,
    Ward,
} from '../../../../../hook/useLocation';
import './address-main.less';

interface Props {
    province?: string;
    district?: string;
    ward?: string;
}

const AddressMain: FC<Props> = (props) => {
    const [province, setProvince] = useState<string | undefined>(props.province);
    const [district, setDistrict] = useState<string | undefined>(props.district);

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (value: string) => {
        setProvince(value);
    };

    const onChangeDistrict = (value: string) => {
        setDistrict(value);
    };

    return (
        <Row gutter={[50, 0]}>
            <Col span={8}>
                <Form.Item
                    name="province"
                    label="Tỉnh/ thành phố"
                    rules={[{ required: true, message: 'Chọn tỉnh/ thành phố' }]}
                >
                    <Select
                        placeholder="Chọn tỉnh thành"
                        onChange={onChangeProvince}
                        showSearch
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: '100%' }}
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
            <Col span={8}>
                <Form.Item
                    name="district"
                    label="Quận/ huyện"
                    rules={[{ required: true, message: 'Chọn quận/ huyện' }]}
                >
                    <Select
                        placeholder="Chọn quận/ huyện"
                        onChange={onChangeDistrict}
                        showSearch
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={!province}
                        loading={loadingDistrict}
                        onFocus={disabledAutosuggestion}
                        style={{ width: '100%' }}
                    >
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
                    name="ward"
                    label="Xã/phường"
                    rules={[{ required: true, message: 'Chọn xã/phường' }]}
                >
                    <Select
                        placeholder="Chọn xã/phường"
                        showSearch
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={!district}
                        loading={loadingWard}
                        onFocus={disabledAutosuggestion}
                        style={{ width: '100%' }}
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

            <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                    <Input.TextArea placeholder="Nhập địa chỉ" rows={3} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default AddressMain;
