import './style.less';

import { Col, Dropdown, Row, Typography } from 'antd';
import { InsaButton, InsaTable } from '../../../components';
import React, { useState } from 'react';

import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { DownOutlined } from '@ant-design/icons';
import iconAdd from '../../../assets/images/ic-add.svg';
import iconSetting from '../../../assets/images/ic-setting.svg';

function NoteCus() {
    const columns: ColumnType<any>[] = [
        {
            title: 'Ghi chú',
            align: 'left',
            render: (text: string, record: any, index: number) => (
                <span>
                    It is a long established fact that a reader will be distracted by the readable
                    content.
                </span>
            ),
        },
        {
            title: 'Người thêm',
            align: 'center',
            dataIndex: 'code',
            render: (text: string, record: any) => <span>Jonh Smith</span>,
        },
        {
            title: 'Thời gian',
            align: 'left',
            dataIndex: 'customer',
            render: (text: string, record: any) => <div>9/9/2020 16:50</div>,
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
                    <Typography.Text type="secondary">Thêm mới ghi chú</Typography.Text>
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

export default NoteCus;
