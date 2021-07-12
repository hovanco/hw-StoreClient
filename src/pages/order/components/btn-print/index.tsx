import { Col, Row } from 'antd';
import React from 'react';
import { PrintIcon } from '../../../../assets/icon';
import { InsaButton } from '../../../../components';

interface Props {}

const BtnPrint = (props: Props) => {
    const handlePrint = () => {};

    return (
        <InsaButton onClick={handlePrint}>
            <Row gutter={10} align="middle">
                <Col>
                    <PrintIcon style={{ fontSize: 18, marginTop: 3 }} />
                </Col>
                <Col>In đơn hàng</Col>
            </Row>
        </InsaButton>
    );
};

export default BtnPrint;
