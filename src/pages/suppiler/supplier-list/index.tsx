import React, { FC, useState } from 'react';
import { DefaultLayout } from '../../../layout';
import { PageTopWrapper, InsaButton, InsaTable } from '../../../components';
import { Typography, Space, Row, Col, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import iconPlus from '../../../assets/images/ic-plus.svg';
import { ExclamationOutlined } from '@ant-design/icons';
import theme from '../../../theme';
import iconSettingSub from '../../../assets/images/ic-setting-secondary.svg';
import iconDownload from '../../../assets/images/ic-download.svg';
import iconUpload from '../../../assets/images/ic-upload.svg';
import { ColumnType } from 'antd/lib/table';

const SupplierList: FC = () => {
    const columns: ColumnType<any>[] = [
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: any) => <Typography.Link>NK0215455</Typography.Link>,
        },
        {
            title: 'Tên nhà cung cấp',
            className: 'column-money',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: () => 'Kho áo sĩ Mỹ Đình 2',
        },
        {
            title: 'Nhóm nhà cung cấp',
            dataIndex: 'length',
            key: 'length',
            align: 'center',
            render: () => 'Cung cấp áo',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (text: string) => 'aothunmydinh@gmail.com',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
            render: () => '0905154545',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: () => 'Đang giao dịch',
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (models: any) => {
        setSelectedRowKeys(models);
    };

    return (
        <DefaultLayout title="NHÀ CUNG CẤP">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>NHÀ CUNG CẤP</Typography.Title>}
                rightContent={
                    <Space>
                        <Link to="new">
                            <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Thêm nhà cung cấp
                            </InsaButton>
                        </Link>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton shape="circle" icon={<ExclamationOutlined />} /> */}
                    </Space>
                }
            />
            <Row
                justify="space-between"
                align="middle"
                style={{
                    height: 74,
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
            >
                <Col span={12}>
                    <Space size="middle">
                        <Input.Search
                            key="search"
                            placeholder="Tìm kiếm sản phẩm"
                            onChange={
                                (e) => {}
                                // handleSearch(e.target.value)
                            }
                            onSearch={() => {}}
                            style={{ width: 330 }}
                            // value={filterState.search || ''}
                        />
                        <Select
                            style={{ minWidth: 200 }}
                            value={'root'}
                            onChange={
                                (value) => {}
                                // handleSelectCategory(value as string)
                            }
                        >
                            <Select.Option value="root">Lọc nhà cung cấp</Select.Option>
                        </Select>
                    </Space>
                </Col>
                <Col span={12}>
                    <Row justify="end">
                        <Space>
                            <InsaButton
                                icon={
                                    <img
                                        style={{ marginRight: 10 }}
                                        src={iconSettingSub}
                                        alt="icon"
                                    />
                                }
                            >
                                <Typography.Text type="secondary">
                                    Điều chỉnh cột hiển thị
                                </Typography.Text>
                            </InsaButton>
                            <InsaButton
                                icon={
                                    <img
                                        style={{ marginRight: 10 }}
                                        src={iconDownload}
                                        alt="icon"
                                    />
                                }
                            >
                                <Typography.Text type="secondary">Nhập file</Typography.Text>
                            </InsaButton>
                            <InsaButton
                                icon={
                                    <img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />
                                }
                            >
                                <Typography.Text type="secondary">Xuất file</Typography.Text>
                            </InsaButton>
                        </Space>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <InsaTable
                        name="Danh sách nhà cung cấp"
                        className="product-tbl"
                        bordered
                        rowSelection={{
                            selectedRowKeys,
                            onChange: onSelectChange,
                        }}
                        columns={columns}
                        pagination={{
                            current: 1,
                            pageSize: 20,
                            total: 80,
                        }}
                        dataSource={[1, 2, 3, 4, 5] as any[]}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default SupplierList;
