import { Card, Col, Row, Space, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { EBillingPackageType } from '../../api/billing-api';
import { InsaButton, PageTopWrapper } from '../../components';
import AddSellChannel from '../../components/sider/add-sell-channel';
import { DefaultLayout } from '../../layout';
import { useBilling } from '../setting/create-billing/state/context';
import BtnRemoveUserGuide from './components/btn-remove-user-guide';
import UserGuidePost from './components/user-guide-post';
import UserGuideSetting from './components/user-guide-setting';

const title = 'Khởi động';

const TimeExpiredTrial: FC = () => {
    const { packagesActive } = useBilling();

    const packageTrial = packagesActive.find(
        (item) => item.packageType === EBillingPackageType.Trial
    );
    if (!packageTrial) return <></>;

    const expiredAt = moment(packageTrial.expiredAt).valueOf();
    const timeNow = Date.now();

    return (
        <Card>
            <div style={{ textAlign: 'center' }}>
                <Space direction="vertical" size={7}>
                    <Typography.Title
                        level={4}
                        style={{ margin: 0, color: '#307dd2', fontWeight: 500 }}
                    >
                        Bạn còn{' '}
                        <span style={{ fontSize: 24 }}>
                            {Math.round((expiredAt - timeNow) / (24 * 60 * 60 * 1000))}
                        </span>{' '}
                        ngày dùng thử miễn phí
                    </Typography.Title>
                    <div>
                        <Typography.Text>
                            Thời gian dùng thử sản phẩm của bạn sẽ sớm kết thúc. Hãy nâng cấp lên
                            gói sản phẩm cao hơn để trải nghiệm
                        </Typography.Text>
                    </div>
                    <Link to="/setting/billings/list">
                        <InsaButton type="primary">Nâng cấp</InsaButton>
                    </Link>
                </Space>
            </div>
        </Card>
    );
};

const HomepageUserGuide: FC = () => {
    return (
        <DefaultLayout title={title}>
            <PageTopWrapper leftContent={<Typography.Title level={3}>{title}</Typography.Title>} />

            <div className="content overview user-guide">
                <div style={{ maxWidth: 1000, margin: 'auto' }}>
                    <Space style={{ width: '100%' }} size={20} direction="vertical">
                        <TimeExpiredTrial />

                        <Card title="Thiết lập cơ bản">
                            <UserGuideSetting />
                        </Card>
                        <Card>
                            <div style={{ textAlign: 'center' }}>
                                <Space direction="vertical" size={7}>
                                    <Typography.Title
                                        level={4}
                                        style={{ margin: 0, color: '#307dd2', fontWeight: 500 }}
                                    >
                                        Kết nối các kênh bán hàng trực tuyến
                                    </Typography.Title>
                                    <div>
                                        <Typography.Text>
                                            Tăng doanh thu tối đa và tiết kiệm thời gian cùng hệ
                                            thống hỗ trợ bán hàng đa kênh
                                        </Typography.Text>
                                    </div>

                                    <AddSellChannel>
                                        <InsaButton>Thiết lập</InsaButton>
                                    </AddSellChannel>
                                </Space>
                            </div>
                        </Card>
                        <Card title="Hướng dẫn INSA">
                            <UserGuidePost />
                        </Card>
                        <div>
                            <Row align="middle" justify="center">
                                <Col>
                                    <BtnRemoveUserGuide />
                                </Col>
                            </Row>
                        </div>
                    </Space>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomepageUserGuide;
