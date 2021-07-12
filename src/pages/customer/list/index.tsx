import React from 'react';

import { CustomerTableProvider } from './context';

import { DefaultLayout } from '../../../layout';
import { Col, Row, Space, Typography } from 'antd';
import { InsaButton, PageTopWrapper } from '../../../components';
import CustomerTable from './table';
import AddCustomer from '../create';
import iconDownload from '../../../assets/images/ic-download.svg';
// import iconQuestion from '../../../assets/images/ic-question.svg';
import iconUpload from '../../../assets/images/ic-upload.svg';

import '../style.less';
import theme from '../../../theme';

function CustomerPage() {
    return (
        <DefaultLayout title="Danh sách khách hàng">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>DANH SÁCH KHÁCH HÀNG</Typography.Title>}
                rightContent={
                    <Space>
                        <AddCustomer />
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton
                            type="default"
                            icon={<img style={{ marginRight: 10 }} src={iconQuestion} alt="icon" />}
                        >
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                }
            />

            {/* TODO: Show after add feature */}
            {/* <Row justify="end" align="middle" style={{ height: 74, paddingRight: theme.spacing.m }}>
                <Space>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconDownload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Nhập file</Typography.Text>
                    </InsaButton>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Xuất file</Typography.Text>
                    </InsaButton>
                </Space>
            </Row> */}

            <Row
                style={{
                    padding: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <CustomerTableProvider>
                        <CustomerTable />
                    </CustomerTableProvider>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default CustomerPage;
