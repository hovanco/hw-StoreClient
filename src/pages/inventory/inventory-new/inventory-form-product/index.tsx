import { Card, Col, Form, Input, Row, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { FC, memo } from 'react';
import { InsaTable } from '../../../../components';

const InventoryFormProduct: FC = () => {
    const columns: ColumnType<any>[] = [
        {
            title: 'Mã sản phẩm',
            className: 'column-money',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            render: (text: string) => <Typography.Link>{text}</Typography.Link>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'length',
            key: 'length',
            align: 'center',
            render: (text: string) => (
                <Typography.Text className="product-tbl__text-round">{text}</Typography.Text>
            ),
        },
        {
            title: 'Giá nhập',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            align: 'center',
            render: (text: string) => (
                <Typography.Text className="product-tbl__text-round">{text}</Typography.Text>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'orderCount',
            key: 'orderCount',
            align: 'center',
        },
    ];
    const dataSource: any[] = [
        {
            code: 'TH202021',
            key: 'TH202021',
            name: 'Áo thun dài tay S- Đỏ',
            length: 8,
            originalPrice: '100.000',
            orderCount: '5.000.000',
        },
    ];
    return (
        <Card size="default" title={<Typography.Text strong>Thông tin sản phẩm</Typography.Text>}>
            <Form.Item name="product" label="">
                <Input.Search size="middle" placeholder="Tìm kiếm sản phẩm" />
            </Form.Item>
            <InsaTable
                size="middle"
                className="inventory-form__product-tbl"
                bordered
                name=""
                pagination={false}
                columns={columns}
                dataSource={dataSource}
            />
            <Row justify="end" className="inventory-form-product__summary">
                <Col span={12}>
                    <Row className="item">
                        <Col span={8}>
                            <Typography.Text>Tổng tiền</Typography.Text>
                        </Col>
                        <Col span={16}>
                            <Typography.Text>: 10.000.000</Typography.Text>
                        </Col>
                    </Row>
                    <Row className="item">
                        <Col span={8}>
                            <Typography.Link className="underline">Chiết khấu</Typography.Link>
                        </Col>
                        <Col span={16}>
                            <Typography.Text>: 10.000.000</Typography.Text>
                        </Col>
                    </Row>
                    <Row className="item">
                        <Col span={8}>
                            <Typography.Link>Chi phí khác</Typography.Link>
                        </Col>
                        <Col span={16}>
                            <Typography.Text>: 10.000.000</Typography.Text>
                        </Col>
                    </Row>
                    <Row className="item">
                        <Col span={8}>
                            <Typography.Text strong>Tiền cần trả</Typography.Text>
                        </Col>
                        <Col span={16}>
                            <Typography.Text>: 10.000.000</Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default memo(InventoryFormProduct);
