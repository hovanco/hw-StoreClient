import { Col, Row, Typography } from 'antd';
import React, { FC, memo } from 'react';
import imageChannelPOS from '../../../assets/channel-pos.png';
import { InsaButton, PageTopWrapper } from '../../../components';
import { POS_URL } from '../../../configs/vars';
import { DefaultLayout } from '../../../layout';
import theme from '../../../theme';
import './style.less';

const title = 'Giới thiệu Insa Pos';

const SaleChannelPagePos: FC = () => {
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
                className="channel-pos"
            >
                <Col span={12} className="content">
                    <p className="header">INSA POS</p>
                    <p className="title">
                        Phần mềm quản lý bán hàng tốt nhất cho cửa hàng & bán online
                    </p>
                    <span className="subtitle">
                        Được trang bị các công cụ độc đáo giúp quản lý cửa hàng, quản lý sản phẩm &
                        tính tiền nhanh chóng dễ dàng.
                    </span>

                    <a href={POS_URL} target="_blank" rel="noreferrer">
                        <InsaButton>Trải nghiệm ngay</InsaButton>
                    </a>
                </Col>

                <Col span={12}>
                    <img alt="pos" src={imageChannelPOS} />
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default memo(SaleChannelPagePos);
