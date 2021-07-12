import React, { FC } from 'react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface IProps {
    name: string;
    collapsed: boolean;
}
export const SiderAvatar: FC<IProps> = ({ name, collapsed }) => (
    <div className="sider-avatar">
        <Avatar size={collapsed ? 44 : 94} icon={<UserOutlined />} />
        <p className="sider-avatar__text" onClick={(e) => e.preventDefault()}>
            {name} <DownOutlined />
        </p>
        <p className="sider-avatar__sub-text">Director</p>
    </div>
);
