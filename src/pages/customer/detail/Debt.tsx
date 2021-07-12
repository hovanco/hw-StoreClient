import './style.less';

import { Col, Dropdown, Row, Space, Typography } from 'antd';
import { InsaButton, InsaTable } from '../../../components';
import React, { useState } from 'react';

import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { DownOutlined } from '@ant-design/icons';
import iconUpload from '../../../assets/images/ic-upload.svg';

function DebtCus() {
    const columns: ColumnType<any>[] = [
        {
            title: 'Mã phiếu',
            align: 'center',
            dataIndex: 'code',
            render: (text: string, record: any) => <span className="blue-text">SM000026</span>,
        },
        {
            title: 'Người tạo',
            align: 'center',
            dataIndex: 'customer',
            render: (text: string, record: any) => <div>Jonh.Smith</div>,
        },
        {
            title: 'Ngày tạo',
            align: 'center',
            render: (text: string, record: any) => <span>8/9/2020</span>,
        },
        {
            title: 'Ngày ghi nhận',
            align: 'center',
            render: (text: string, record: any) => <span>8/9/2020</span>,
        },
        {
            title: 'Ghi chú',
            align: 'center',
            render: (text: string, record: any) => <span>Giao hàng thành công</span>,
        },
        {
            title: 'Giá trị thay đôi',
            align: 'center',
            render: (text: string) => <span>502.000</span>,
        },
        {
            title: 'Công nợ',
            align: 'center',
            render: (text: string) => <span>502.000</span>,
        },
    ];
    const [page, setPage] = useState(1);
    const onChangPagination = (page: number) => {
        setPage(page);
    };
    const orders = [{ _id: 1 }];
    return (
        <DefaultLayout title="Customer">
            <Row>
                <InsaButton
                    icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
                    className="tab-btn"
                >
                    <Typography.Text type="secondary">Xuất file</Typography.Text>
                </InsaButton>
                <Col span={24}>
                    <InsaTable
                        loading={false}
                        columns={columns}
                        dataSource={orders.map((e) => ({
                            ...e,
                            key: e._id,
                        }))}
                        bordered
                        pagination={{
                            pageSize: 20,
                            current: page,
                            total: 1,
                            onChange: onChangPagination,
                        }}
                        name=""
                        className="order-tbl"
                        hasDefaultColumn={false}
                        headerExtend={
                            <Row className="order-tbl-header">
                                <Col span={24}>
                                    <Space>
                                        <Dropdown overlay={<></>}>
                                            <InsaButton>
                                                <Typography.Text type="secondary">
                                                    Lọc công nợ
                                                </Typography.Text>
                                                <DownOutlined />
                                            </InsaButton>
                                        </Dropdown>
                                        <div className="debt">
                                            Ngày ghi nhận: từ 08/8/2020 đến 08/8/2020
                                            <p>X</p>
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                        }
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default DebtCus;
