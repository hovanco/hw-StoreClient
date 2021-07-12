import { Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import './label-card.less';

interface Props {
    title?: string;
    icon?: any;
}

const { Text } = Typography;

const LabelCard = (props: Props) => {
    return (
        <Row className="label-card">
            <Col className="label-icon">
                <img src={props.icon} alt="icon" />
            </Col>
            <Col>
                <Text className="label-text">{props.title}</Text>
            </Col>
            <Divider className="label-divider" />
        </Row>
    );
};

export default LabelCard;
