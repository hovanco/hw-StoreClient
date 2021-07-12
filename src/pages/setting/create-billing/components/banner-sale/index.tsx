import { Col, Row, Typography } from 'antd';
import React from 'react';
import './banner-sale.less';
import saleBanenr from '../../../../../assets/images/sale-banner.svg';

interface Props {
    title1?: string;
    title2?: string;
    title3?: string;
}

const { Text, Title } = Typography;

const BannerSale = (props: Props) => {
    return (
        <Row className="banner">
            <Col span={14} className="banner-content">
                <Title level={4} className="banner-text-1">
                    {props.title1}
                </Title>
                <Text className="banner-text-2">{props.title2}</Text>
                <Title level={4} className="banner-text-1">
                    {props.title3}
                </Title>
            </Col>
            <Col span={10}>
                <img src={saleBanenr} className="sale-image" alt="sale-banner" />
            </Col>
        </Row>
    );
};

export default BannerSale;
