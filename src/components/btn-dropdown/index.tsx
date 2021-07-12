import { CaretDownFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { FC, ReactNode } from 'react';
import { InsaButton } from '..';
import './btn-dropdown.less';

interface Props {
    children?: ReactNode;
    style?: any;
}

const BtnDropdown: FC<Props> = ({ children, style, ...otherProps }) => {
    if (!children) {
        return (
            <InsaButton {...otherProps} className="btn-dropdown" style={{ ...style }}>
                <CaretDownFilled style={{ fontSize: 12 }} />
            </InsaButton>
        );
    }
    return (
        <InsaButton {...otherProps} className="btn-dropdown" style={{ ...style }}>
            <Row justify="space-between" align="middle" gutter={15}>
                <Col>{children}</Col>

                <Col>
                    <CaretDownFilled style={{ fontSize: 12 }} />
                </Col>
            </Row>
        </InsaButton>
    );
};

export default BtnDropdown;
