import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space, Typography } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import dataFilterInventory from '../../pages/inventory/inventory-list/advance-filter/data';
import { logout } from '../../reducers/authState/authAction';
import { IStorageState } from '../../reducers/authState/authReducer';
import { IStoreState } from '../../reducers/storeState/reducer';

const HeaderRight = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(({ auth }: { auth: IStorageState }) => auth.isAuth);
    const user = useSelector(({ auth } : {auth: IStorageState}) => auth.user);
    const storeName = useSelector(({ store } : {store: IStoreState}) => store.data);

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
        <Menu onClick={menuOnClick} className="user-menu">
            {!isAuth ? (
                <Menu.Item key="login">Đăng nhập</Menu.Item>
            ) : (
                <>
                    <Menu.Item key="1">
                        <strong>{get(user, 'name')}</strong>
                        <span className="user-info">{get(user, 'email')}</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/setting-profile">Cài đặt tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="logout">Đăng xuất</Menu.Item>
                </>
            )}
        </Menu>
        
    );

    return (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="user-dropdown">
                <Space>
                    <Typography.Text className="user-dropdown-content">
                        <span className="user-dropdown__store">{get(storeName, ['name'])}</span>
                        <span className="user-dropdown__user" >{get(user, ['name'])}</span>
                    </Typography.Text>
                    <Avatar icon={<UserOutlined />} size={45} src={user.picture} />
                </Space>
            </div>
        </Dropdown>
    );
};

export default HeaderRight;
