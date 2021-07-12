import { Row, Space, Typography } from 'antd';
import React from 'react';
import { InsaButton } from '../../../../../components';
import constants from '../../../../../constants';
import './banner-footer.less';

interface Props {}

const BannerFooter = (props: Props) => {
    return (
        <Row justify="center" align="middle" className="footer-billing">
            <div className="footer-billing-bg" />
            <Space direction="vertical" size={10} className="footer-billing-content">
                <Typography.Text className="footer-title-billing">
                    TRẢI NGHIỆM DỊCH VỤ CHĂM SÓC TỐT NHẤT TỪ INSA
                </Typography.Text>
                <Row justify="center">
                    <a href={constants.INSA_FACEBOOK_PAGE} target="_blank" rel="noreferrer">
                        <InsaButton type="primary" className="footer-button">
                            NHẬN TƯ VẤN MIỄN PHÍ
                        </InsaButton>
                    </a>
                </Row>
            </Space>
        </Row>
    );
};

export default BannerFooter;
