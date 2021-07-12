import './style.less';

import { Col, Dropdown, Row, Typography } from 'antd';
import { InsaButton, InsaTable } from '../../../components';
import React, { useState } from 'react';

import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { DownOutlined } from '@ant-design/icons';
import iconAdd from '../../../assets/images/ic-add.svg';
import iconSetting from '../../../assets/images/ic-setting.svg';

function ContactCus() {
    const columns: ColumnType<any>[] = [
        {
            title: 'Tên liên hệ',
            align: 'center',
            dataIndex: 'code',
            render: (text: string, record: any) => <span>Nguyễn Đức Mạnh</span>,
        },
        {
            title: 'Số điện thoại',
            align: 'center',
            dataIndex: 'customer',
            render: (text: string, record: any) => <div>0398787817</div>,
        },
        {
            title: 'Email',
            align: 'center',
            render: (text: string, record: any) => <span>ducmanh.gco@gmail.com</span>,
        },
        {
            title: 'Chức vụ',
            align: 'center',
            render: (text: string, record: any) => <span>Trưởng phòng</span>,
        },
        {
            title: 'Bộ phận',
            align: 'center',
            render: (text: string, record: any) => <span>Marketing</span>,
        },
        {
            title: () => (
                <div className="setting-column">
                    <img src={iconSetting} alt="insa-setting" />
                </div>
            ),
            align: 'center',
            render: () => (
                <Dropdown overlay={<></>}>
                    <InsaButton>
                        <DownOutlined />
                    </InsaButton>
                </Dropdown>
            ),
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
                    icon={<img style={{ marginRight: 10 }} src={iconAdd} alt="icon" />}
                    className="tab-btn"
                >
                    <Typography.Text type="secondary">Thêm mới liên hệ</Typography.Text>
                </InsaButton>
                <Col span={24}>
                    <InsaTable
                        loading={false}
                        columns={columns}
                        rowSelection={{}}
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
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default ContactCus;
