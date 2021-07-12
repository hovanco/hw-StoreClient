import { Col, Row, Typography } from 'antd';
import React, { FC, memo } from 'react';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import theme from '../../../theme';
import './style.less';

import imageChannelShoppe from '../../../assets/channel-shoppe.png';

const title = 'Giới thiệu Insa Shopee';

const SaleChannelPageShoppe: FC = () => {
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
                className="channel-shoppe"
            >
                <Col span={12} className="content">
                    <p className="header">INSA SHOPEE</p>
                    <p className="title">
                        Kết nối hệ thống của INSA và Shopee, giúp đẩy sản phẩm trực tiếp lên Shopee
                        cũng như đồng bộ về tồn kho, đơn hàng.
                    </p>
                    <span className="subtitle">
                        Kênh bán hàng Shopee của bạn chưa được kích hoạt. Vui lòng kích hoạt để bắt
                        đầu sử dụng.
                    </span>

                    <InsaButton onClick={() => {}}>Kích hoạt ngay</InsaButton>
                </Col>

                <Col span={12}>
                    <img alt="facebook" src={imageChannelShoppe} />
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default memo(SaleChannelPageShoppe);
