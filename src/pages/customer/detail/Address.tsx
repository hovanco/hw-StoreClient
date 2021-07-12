import './style.less';

import { Col, Dropdown, Row, Typography } from 'antd';
import { InsaButton, InsaTable } from '../../../components';
import React, { useState } from 'react';

import { ColumnType } from 'antd/lib/table';
import { DefaultLayout } from '../../../layout';
import { DownOutlined } from '@ant-design/icons';
import iconAdd from '../../../assets/images/ic-add.svg';
import iconSetting from '../../../assets/images/ic-setting.svg';

function AddressCus() {
    const columns: ColumnType<any>[] = [
        {
            title: 'STT',
            align: 'center',
            render: (text: string, record: any, index: number) => (
                <span>{index + 1 + 20 * (page - 1)}</span>
            ),
        },
        {
            title: 'Nhãn',
            align: 'center',
            dataIndex: 'code',
            render: (text: string, record: any) => <span>Đà Nẵng</span>,
        },
        {
            title: 'Địa chỉ',
            align: 'left',
            dataIndex: 'customer',
            render: (text: string, record: any) => (
                <div>419 đường Núi Thành, Quận Hải Châu. Thành T.P Đà Nẵng</div>
            ),
        },
        {
            title: 'Phường xã',
            align: 'center',
            render: (text: string, record: any) => <span>Hòa Cường Bắc</span>,
        },
        {
            title: 'Quận huyện',
            align: 'center',
            render: (text: string, record: any) => <span>Hải Châu</span>,
        },
        {
            title: 'Tỉnh thành phố',
            align: 'center',
            render: (text: string, record: any) => <span>Đà Nẵng</span>,
        },
        {
            title: 'Quốc gia',
            align: 'center',
            render: (text: string) => <span>Việt Nam</span>,
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
                    <Typography.Text type="secondary">Thêm mới địa chỉ</Typography.Text>
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

export default AddressCus;
