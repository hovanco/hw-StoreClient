import { ExclamationOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import React, { FC } from 'react';
import iconUpload from '../../../assets/images/ic-upload.svg';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { CustomerReportChart, CustomerReportTable, ReportCustomerTab } from './components';
import { ProviderReportCustomer } from './state';

interface Props {}

const title = 'Báo cáo khách hàng';

export const ReportCustomer: FC<Props> = () => {
    return (
        <ProviderReportCustomer>
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={<Typography.Title level={3}>{title}</Typography.Title>}
                    rightContent={
                        <Space>
                            <InsaButton
                                icon={
                                    <img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />
                                }
                            >
                                <Typography.Text type="secondary">Xuất file</Typography.Text>
                            </InsaButton>
                            {/* TODO: Show after add feature */}
                            {/* <InsaButton shape="circle" icon={<ExclamationOutlined />} /> */}
                        </Space>
                    }
                />
                <div className="content">
                    <Row gutter={[16, 20]}>
                        <Col span={24}>
                            <ReportCustomerTab />
                        </Col>
                        <Col span={24}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <CustomerReportChart />
                                </Col>
                                <Col span={24}>
                                    <CustomerReportTable />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </DefaultLayout>
        </ProviderReportCustomer>
    );
};

export default ReportCustomer;
