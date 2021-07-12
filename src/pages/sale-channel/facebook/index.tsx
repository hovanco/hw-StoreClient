import { Col, Row, Typography } from 'antd';
import React, { FC, memo } from 'react';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import theme from '../../../theme';
import './style.less';

import imageChannelFacebook from '../../../assets/channel-facebook.png';
import { FACEBOOK_URL } from '../../../configs/vars';

const title = 'Giới thiệu Insa Facebook';

const SaleChannelPageFacebook: FC = () => {
    return (
        <DefaultLayout title={title}>
            <PageTopWrapper leftContent={<Typography.Title level={3}>{title}</Typography.Title>} />

            <Row
                justify="space-between"
                style={{
                    height: 74,
                    paddingLeft: theme.spacing.m,
                    paddingRight: theme.spacing.m,
                }}
                className="channel-facebook"
            >
                <Col span={12} className="content">
                    <p className="header">INSA FACEBOOK</p>
                    <p className="title">
                        Kết nối hệ thống của INSA với facebook, giúp livestream dễ dàng, trả lời
                        inbox khách hàng nhanh hơn. Tăng tốc độ chốt đơn
                    </p>
                    <span className="subtitle">
                        Kênh livestream facebook của bạn chưa được kích hoạt. Vui lòng kích hoạt để
                        bắt đầu sử dụng.
                    </span>

                    <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                        <InsaButton>Trải nghiệm ngay</InsaButton>
                    </a>
                </Col>

                <Col span={12}>
                    <img alt="facebook" src={imageChannelFacebook} />
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default memo(SaleChannelPageFacebook);
