import { Card, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { FC } from 'react';
import { BackLink, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import Owner from './components/owner';
import Staffs from './components/staffs';
import { ProviderAccount } from './state';

const title = 'Cài đặt tài khoản';

const Account: FC = () => {
    return (
        <ProviderAccount>
            <DefaultLayout title={title}>
                <PageTopWrapper
                    leftContent={
                        <>
                            <BackLink to="/setting" text="Cài đặt" />
                            <Title level={3}>{title}</Title>
                        </>
                    }
                />
                <div className="content general-information">
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Card
                                className="card-custom"
                                bordered={false}
                                type="inner"
                                title="Chủ cửa hàng"
                            >
                                <Owner />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Staffs />
                        </Col>
                    </Row>
                </div>
            </DefaultLayout>
        </ProviderAccount>
    );
};

export default Account;
