import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space, Typography } from 'antd';
import React, { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../reducers/authState/authAction';
import { IState } from '../../store/rootReducer';

interface Props {}

const HeaderRight: FC<Props> = (): ReactElement => {
    const history = useHistory();
    const isAuth = useSelector((state: IState) => state.auth.isAuth);
    const user = useSelector((state: IState) => state.auth.user);

    const dispatch = useDispatch();

    const menuOnClick = async (value: any) => {
        switch (value.key) {
            case 'login':
                history.push('/login');
                break;

            case 'logout': {
                await dispatch(logout());

                history.push('/login');
                return;
            }

            default:
                break;
        }
    };

    const menu = (
        <Menu style={{ width: 150 }} onClick={menuOnClick}>
            {!isAuth ? (
                <Menu.Item key="login">Đăng nhập</Menu.Item>
            ) : (
                <Menu.Item key="logout">Đăng xuất</Menu.Item>
            )}
        </Menu>
    );

    return (
        <Space>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <div className="user-dropdown">
                    <Typography.Text className="username">{user.name}</Typography.Text>
                    <CaretDownOutlined />
                    {user.picture ? (
                        <Avatar src={user.picture} size={38} />
                    ) : (
                        <Avatar icon={<UserOutlined />} size={38} />
                    )}
                </div>
            </Dropdown>
        </Space>
    );
};

export default HeaderRight;
