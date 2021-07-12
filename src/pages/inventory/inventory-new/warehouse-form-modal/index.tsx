import { Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import React, { FC, memo } from 'react';

interface Props extends ModalProps {
    // visible: boolean;
}
const WarehouseFormModal: FC<Props> = ({ visible, onCancel, onOk }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title={
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                    Thêm kho hàng
                </Typography.Title>
            }
            width={668}
            className=""
            visible={visible}
            onOk={() => {}}
            onCancel={onCancel}
            closable={false}
            okButtonProps={{
                size: 'middle',
                style: {
                    width: 140,
                },
            }}
            okText="Thêm"
            cancelText="Thoát"
            cancelButtonProps={{
                size: 'middle',
                style: {
                    width: 140,
                },
            }}
        >
            <Form
                layout="vertical"
                className="inventory-form"
                size="middle"
                form={form}
                initialValues={{
                    categoryId: '',
                }}
            >
                <Row gutter={[32, 0]}>
                    <Col span={12}>
                        <Form.Item name="name" label="Tên kho hàng">
                            <Input placeholder="Kho chi nhánh 1" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Số điện thoại">
                            <Input placeholder="090505454" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="address" label="Địa chỉ">
                            <Input placeholder="k21/42 Tôn Đức Thắng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="city" label="Thành phố">
                            <Select placeholder="Đà Nẵng"></Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="district" label="Phường/Xã">
                            <Select placeholder="Xuân Hà Bắc"></Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ward" label="Quận/ Huyện">
                            <Select placeholder="Xuân Hà Bắc"></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
export default memo(WarehouseFormModal);
