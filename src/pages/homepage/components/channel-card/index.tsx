import { Card, Col, Divider, Row, Space } from 'antd';
import React, { FC, memo } from 'react';
import { DownIcon } from '../../../../assets/icon';
import { IChannelData } from '../../state';
import RevenueChannelChart from '../revenue-channel-chart';
import './channel-card.less';
import IconCard from './icon-card';

interface Props {
    icon: string;
    color: string;
    title: string;
    data?: IChannelData;
    loading?: boolean;
}

const ChannelCard: FC<Props> = ({ icon, color, title, data }) => {
    const renderContentCard = () => {
        if (!data) return null;

        const categories = data.data.map((item) => item.date);
        const values = data.data.map((item) => item.value);

        return (
            <Row gutter={50}>
                <Col span={5}>
                    <div className="channel-content">
                        <Space size={5} direction="vertical">
                            <div className="channel-content-title">Số lượng khách hàng</div>
                            <div className="channel-content-number">{data.customerCount}</div>
                            <div className="channel-content-percent"></div>
                        </Space>
                    </div>
                    <Divider />
                    <div className="channel-content">
                        <Space size={5} direction="vertical">
                            <div className="chanel-content-title">Số đơn hàng</div>
                            <div className="channel-content-number" style={{ color }}>
                                {data.orderCount}
                            </div>
                            <div className="channel-content-percent" style={{ color }}></div>
                        </Space>
                    </div>
                </Col>
                <Col span={19}>
                    <Space size={30} direction="vertical" style={{ width: '100%' }}>
                        <div>Biểu đồ doanh thu</div>

                        <RevenueChannelChart
                            color={color}
                            categories={categories}
                            values={values}
                        />
                    </Space>
                </Col>
            </Row>
        );
    };

    return (
        <Card className="overview-card channel-card" bordered={false}>
            <div className="title-large">
                <Row align="middle" gutter={20}>
                    <Col>
                        <IconCard icon={icon} />
                    </Col>
                    <Col>
                        <span className="text">{title}</span>

                        <DownIcon
                            style={{
                                display: 'inline-block',
                                fontSize: 20,
                                marginLeft: 5,
                                marginTop: 3,
                            }}
                        />
                    </Col>
                </Row>
            </div>

            {renderContentCard()}
        </Card>
    );
};

export default memo(ChannelCard);
