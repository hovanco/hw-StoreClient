import { Avatar, Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IGroupSetting, IMenuSetting } from './index';

const { Meta } = Card;

interface Props {
    group: IGroupSetting;
}

const SettingGroup: FC<Props> = ({ group }) => {
    if (group.hide) {
        return null;
    }
    return (
        <Card
            key={group.name}
            type="inner"
            title={group.name}
            bordered={false}
            className="card-custom"
        >
            <Row gutter={[16, 26]} className="group-wrapper">
                {group.items.map(
                    (menu: IMenuSetting) =>
                        !menu.hide && (
                            <Col key={menu.name} xs={24} sm={24} md={12} lg={12} xl={8}>
                                <Meta
                                    avatar={<Avatar src={menu.icon} />}
                                    title={<Link to={menu.path}>{menu.name}</Link>}
                                    description={menu.description}
                                />
                            </Col>
                        )
                )}
            </Row>
        </Card>
    );
};

export default SettingGroup;
