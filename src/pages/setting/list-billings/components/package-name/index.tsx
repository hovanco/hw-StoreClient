import { Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import './package-name.less';

const { Title } = Typography;

interface Props {
    title: string;
    bgColor: string;
    small?: boolean;
}

const PackageName: FC<Props> = ({ title, bgColor, small }) => {
    const style = { background: bgColor };

    return (
        <Row className="package-name">
            <Col span={24} className={small ? 'name-view-small' : 'name-view'} style={style}>
                <Title level={4} className={small ? 'title-small' : 'title'}>
                    {title}
                </Title>
            </Col>
        </Row>
    );
};

export default PackageName;
