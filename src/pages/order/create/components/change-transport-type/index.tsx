import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import React, { FC } from 'react';
import { DeliveryCarIcon } from '../../../../../assets/icon';
import { useOrderNew } from '../../state/context';
import { EShipTypes } from '../../state/interface';

interface Props {
    type: EShipTypes;
}

const ButtonTransportType: FC<Props> = ({ type }) => {
    const { shipType, changeShipType } = useOrderNew();

    const onClick = () => changeShipType(type);

    const title = type === EShipTypes.SelfTransport ? 'Tự vận chuyển' : 'Gửi vận chuyển';

    const btnType = type === shipType ? 'primary' : 'default';

    const icon =
        type === EShipTypes.SelfTransport ? (
            <UserOutlined style={{ fontSize: 16 }} />
        ) : (
            <DeliveryCarIcon style={{ fontSize: 18 }} />
        );

    return (
        <Button type={btnType} onClick={onClick}>
            <Row align="middle" gutter={10} style={{ lineHeight: 1 }}>
                <Col>{icon}</Col>
                <Col>{title}</Col>
            </Row>
        </Button>
    );
};

const ChangeTransportType = () => {
    return (
        <Space size={16}>
            <ButtonTransportType type={EShipTypes.SendShipping} />

            <ButtonTransportType type={EShipTypes.SelfTransport} />
        </Space>
    );
};

export default ChangeTransportType;
