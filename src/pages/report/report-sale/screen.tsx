import { ExclamationOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import iconUpload from '../../../assets/images/ic-upload.svg';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { ReportSaleTab, SaleReportChart, SaleReportTable } from './components';
import { ProviderReportSale, useReportSale } from './state';

interface Props {}

const title = 'Báo cáo bán hàng';

const ReportSaleContent = () => {
    const { loadData, tab, filter, startTime, endTime } = useReportSale();

    useEffect(() => {
        loadData({
            tab,
            filter,
            startTime,
            endTime,
        });
    }, [tab, filter, startTime, endTime]);

    return (
        <DefaultLayout title={title}>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>{title}</Typography.Title>}
                rightContent={
                    <Space>
                        <InsaButton
                            icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
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
                        <ReportSaleTab />
                    </Col>
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <SaleReportChart />
                            </Col>

                            <Col span={24}>
                                <SaleReportTable />
                            </Col>

                            {/* <Col span={24}>
                        <CustomerReportChart />
                    </Col>
                    <Col span={24}>
                        <CustomerReportTable />
                    </Col> */}
                        </Row>
                    </Col>
                </Row>
            </div>
        </DefaultLayout>
    );
};

export const ReportSale: FC<Props> = () => {
    return (
        <ProviderReportSale>
            <ReportSaleContent />
        </ProviderReportSale>
    );
};

export default ReportSale;
