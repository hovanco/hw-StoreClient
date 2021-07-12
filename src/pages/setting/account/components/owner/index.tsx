import { MailOutlined, MobileOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import constants from '../../../../../constants';
import { IStaff } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useStaffs } from '../../state';
import { getOwner } from '../../util';
import './owner.less';

const Owner: FC = () => {
    const [progress, setProgress] = useState<boolean>(true);
    const [owner, setOwner] = useState<IStaff>();
    const store = useSelector((state: IState) => state.store.data);
    const { loading, staffs } = useStaffs();

    useEffect(() => {
        if (store.ownerId) {
            const staffExist = getOwner({
                ownerId: store.ownerId,
                staffs,
            });

            setOwner(staffExist);
            setProgress(false);
        } else {
            setProgress(false);
        }
    }, [store]);

    if (loading || progress) {
        return <Skeleton avatar paragraph={{ rows: 2 }} />;
    }

    if (!owner) {
        return <></>;
    }

    return (
        <Row gutter={20} align="middle">
            <Col>
                <Avatar
                    size={60}
                    src={`${constants.URL_IMG}${owner.picture}`}
                    icon={<UserOutlined />}
                />
            </Col>
            <Col>
                <Space direction="vertical" size={3}>
                    <div className="owner_name">
                        <Space>
                            {owner.name}
                            <span>( Tài khoản toàn quyền truy cập của cửa hàng )</span>
                        </Space>
                    </div>

                    <div className="owner_detail">
                        <Space align="center">
                            <MailOutlined style={{ marginTop: 5 }} />

                            {owner.email}
                        </Space>
                    </div>
                    <div className="owner_detail">
                        <Space align="center">
                            <MobileOutlined style={{ marginTop: 5 }} />

                            {store.phoneNo}
                        </Space>
                    </div>
                </Space>
            </Col>
        </Row>
    );
};

export default Owner;
