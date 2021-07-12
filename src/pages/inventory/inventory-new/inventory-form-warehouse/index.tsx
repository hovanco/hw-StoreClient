import { Card, Checkbox, Form, Row, Select, Space, Typography } from 'antd';
import React, { FC, memo, useState } from 'react';
import WarehouseFormModal from '../warehouse-form-modal';

type Props = {};
const InventoryFormWarehouse: FC<Props> = () => {
    const [visibleWarehouse, setVisibleWarehouse] = useState<boolean>(false);
    const [visibleAddWarehouse, setVisibleAddWarehouse] = useState<boolean>(false);

    const changeWarehouseType = (e: 'create' | 'defaultWarehouse') => {
        if (e === 'create') {
            setVisibleAddWarehouse(true);
        }
    };
    return (
        <>
            <Card title="Nhập kho" size="default" bodyStyle={{ paddingBottom: 0 }}>
                <Form.Item name="warehouse" label="" valuePropName="checked">
                    <Checkbox onChange={(e) => setVisibleWarehouse(e.target.checked)}>
                        <Typography.Text strong>Nhập hàng vào kho</Typography.Text>
                    </Checkbox>
                </Form.Item>
                {visibleWarehouse && (
                    <>
                        <Space>
                            <Typography.Text strong>Chọn kho</Typography.Text>
                            <Form.Item noStyle name="warehouseType">
                                <Select
                                    style={{ width: 136 }}
                                    size="middle"
                                    onChange={changeWarehouseType}
                                >
                                    <Select.Option value="create">+ Tạo kho hàng</Select.Option>
                                    <Select.Option value="defaultWarehouse">
                                        Kho mặc định
                                    </Select.Option>
                                    <Select.Option value="secondBranch">
                                        Kho chi nhánh 2
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Space>
                        <Row style={{ marginTop: 4, marginBottom: 28 }}>
                            <Typography.Text strong>
                                Địa chỉ: 240 Nguyễn Thái Học, Phường Hòa Hải, Quận Hải Châu, TP Đà
                                Nẵng
                            </Typography.Text>
                        </Row>
                    </>
                )}
            </Card>
            <WarehouseFormModal
                visible={visibleAddWarehouse}
                onCancel={() => setVisibleAddWarehouse(false)}
            />
        </>
    );
};

export default memo(InventoryFormWarehouse);
