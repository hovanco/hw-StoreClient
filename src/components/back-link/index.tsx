import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from '../../assets/icon';
import './back-link.less';

interface Props {
    to: string;
    text: string;
    isGoBack?: boolean;
}

const BackLink: FC<Props> = ({ to, text, isGoBack }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const children = (
        <Row align="middle" gutter={10}>
            <Col>
                <ArrowLeftIcon style={{ fontSize: 20 }} />
            </Col>
            <Col>
                <span className="text">{text}</span>
            </Col>
        </Row>
    );

    if (isGoBack) {
        return (
            <div className="back-link" onClick={goBack}>
                {children}
            </div>
        );
    }

    return (
        <Link to={to} className="back-link">
            {children}
        </Link>
    );
};

export default BackLink;
