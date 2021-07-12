import { Typography, Row, Col } from 'antd';
import React from 'react';
import './package-content.less';

const { Text } = Typography;

interface InfoContent {
    title: string;
    value: string;
}
interface IProps {
    title: string;
    data: InfoContent[];
    spanTitle: number;
}

function PackageContent(props: IProps) {
    return (
        <Col span={24} className="package-content">
            <Text className="label">{props.title}</Text>
            <Row>
                {props.data.map((item: InfoContent, index: number) => (
                    <Col span={24} key={index}>
                        <Row>
                            <Col span={props.spanTitle || 10}>
                                <Text className="info-label">{item?.title}</Text>
                            </Col>
                            <Col>
                                <Text className="info-value">: {item?.value}</Text>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

export default PackageContent;
