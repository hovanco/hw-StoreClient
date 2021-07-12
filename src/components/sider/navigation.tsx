import { Menu } from 'antd';
import { some } from 'lodash';
import React, { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
    ActionUserIcon,
    BoxIcon,
    EcommerceDeliveryIcon,
    LayoutLeftMenuIcon,
    NavOrderSvgIcon,
    ReportIcon,
    SettingIcon,
} from '../../assets/icon';
import iconAddCircle from '../../assets/images/ic-actions-add.svg';
import { SALE_CHANNEL_DATA } from '../../constants/sale-channels';
import { EUserRole } from '../../models';
import { SaleChannel } from '../../models/sale-channel';
import { IStoreState } from '../../reducers/storeState/reducer';
import { IState } from '../../store/rootReducer';
import { Scrollbar } from '../index';
import AddSellChannel from './add-sell-channel';
import './style.less';

export interface MenuChildType {
    href: string;
    title: string;
    icon?: JSX.Element | string;
    children?: MenuChildType[];
    render?: JSX.Element;
    otherHref?: string[];
}

export const menus: MenuChildType[] = [
    {
        title: 'Tổng quan',
        href: '/',
        icon: <LayoutLeftMenuIcon />,
    },
    {
        title: 'Đơn hàng',
        href: '/orders',
        icon: <NavOrderSvgIcon />,
        children: [
            {
                title: 'Tạo đơn hàng',
                href: '/orders/new',
            },
            {
                title: 'Danh sách đơn hàng',
                href: '/orders/list',
                otherHref: ['/orders/order'],
            },
            // TODO: Show after add feature
            // {
            //     title: 'Khách trả hàng',
            //     href: '/orders/returned',
            // },
        ],
    },
    {
        title: 'Vận chuyển',
        href: '/delivery',
        icon: <EcommerceDeliveryIcon />,
        children: [
            {
                title: 'Tổng quan',
                href: '/delivery/overview',
            },
            {
                title: 'Quản lý vận chuyển',
                href: '/delivery/list',
                otherHref: ['/delivery/detail'],
            },
        ],
    },
    {
        title: 'Sản phẩm',
        href: '/products',
        icon: <BoxIcon />,
        children: [
            {
                title: 'Danh sách sản phẩm',
                href: '/products/list',
                otherHref: ['/products/new', '/products/detail'],
            },
            {
                title: 'Quản lý kho',
                href: '/inventory/list',
                otherHref: ['/inventory/new'],
            },
            // TODO: Show after add feature
            // {
            //     title: 'Đơn nhập kho',
            //     href: '/warehouse/list',
            // },
            // {
            //     title: 'Nhà cung cấp',
            //     href: '/supplier/list',
            //     otherHref: ['supplier/new'],
            // },
        ],
    },
    {
        title: 'Khách hàng',
        href: '/customers',
        icon: <ActionUserIcon />,
    },
    {
        title: 'Báo cáo',
        href: 'report',
        icon: <ReportIcon />,
        children: [
            {
                title: 'Báo cáo bán hàng',
                href: '/reports/sale',
            },
            /* { */
            /*     title: 'Báo cáo nhập hàng', */
            /*     href: '/reports/warehouse', */
            /* }, */
            /* { */
            /*     title: 'Báo cáo tài chính', */
            /*     href: '/reports/financinal', */
            /* }, */
            {
                title: 'Báo cáo khách hàng',
                href: '/reports/customer',
            },
        ],
    },
    {
        title: 'Cài đặt',
        href: '/setting',
        icon: <SettingIcon />,
    },
    {
        title: 'KÊNH BÁN HÀNG',
        href: '',
        icon: iconAddCircle,
        render: (
            <div className="nav-sell-channel">
                <Link to="" style={{ position: 'relative' }}>
                    <span>KÊNH BÁN HÀNG</span>
                </Link>
                <AddSellChannel />
            </div>
        ),
    },
];

interface IProps {}

const Navigation: FC<IProps> = () => {
    const isCollapsed = useSelector((state: IState) => state.global.isCollapsed);
    const store = useSelector((state: IState) => state.store.data);

    const [saleChannelMenu, setSaleChannelMenu] = useState<MenuChildType[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>(window.location.pathname);
    const location = useLocation();
    const { data: storeObj } = useSelector(({ store }: { store: IStoreState }) => store);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const rootSubmenuKeys = menus
        .map((c: MenuChildType) => {
            if (Boolean(c.children)) {
                return c.href;
            }
            return '';
        })
        .filter((c) => !!c);

    useEffect(() => {
        let parentMenu;
        let childrenMenu;

        for (const menu of menus) {
            parentMenu = menu;
            if (!!menu.href && menu.href !== '/') {
                if (menu.children) {
                    childrenMenu = menu.children.find(
                        (subMenu: MenuChildType) =>
                            location.pathname.includes(subMenu.href) ||
                            some(subMenu.otherHref, (href: string) =>
                                location.pathname.includes(href)
                            )
                    );
                    if (childrenMenu) {
                        break;
                    }
                } else if (location.pathname.includes(menu.href)) {
                    break;
                }
            }
        }

        if (parentMenu && childrenMenu) {
            setSelectedKey(childrenMenu?.href || location.pathname);
            !isCollapsed && setOpenKeys([parentMenu.href]);
        } else {
            setSelectedKey(parentMenu?.href || window.location.pathname);
            setOpenKeys([]);
        }
    }, [location, isCollapsed]);

    useEffect(() => {
        let saleChannelsAddedData: any = SALE_CHANNEL_DATA.filter((item: SaleChannel) =>
            storeObj?.saleChannels?.includes(item.id)
        );

        saleChannelsAddedData = saleChannelsAddedData.map((item: SaleChannel) => ({
            title: item.menuTitle,
            href: item.href,
            render: (
                <Link to={item.href} className="custom-render-link">
                    <span
                        className="nav__icon anticon"
                        style={{ backgroundImage: `url(${item.icon})` }}
                    ></span>
                    <span>{item.menuTitle}</span>
                </Link>
            ),
        }));

        setSaleChannelMenu(saleChannelsAddedData);
    }, [storeObj.saleChannels]);

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const height = 'calc(100vh - 111px)';

    const filterMenus =
        typeof store?.role === 'number' &&
        [EUserRole.owner, EUserRole.manager].includes(store?.role)
            ? menus
            : menus.filter((item) => item.href !== '/setting');

    return (
        <Scrollbar
            style={{ height, marginTop: 64 }}
            renderThumbVertical={(props: any) => <div {...props} className="thumb-vertical" />}
        >
            <Menu
                mode="inline"
                theme="dark"
                className="nav__menu"
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
            >
                {filterMenus.map((c: MenuChildType) =>
                    Boolean(c.children) ? (
                        <Menu.SubMenu
                            icon={
                                <span>
                                    {c.icon}
                                    <span>{c.title}</span>
                                </span>
                            }
                            key={c.href}
                        >
                            {c.children?.map((sub) => (
                                <Menu.Item key={sub.href}>
                                    <Link to={sub.href}>{sub.title}</Link>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key={c.href} onClick={() => setOpenKeys([])}>
                            {c.render ? (
                                c.render
                            ) : (
                                <Link to={c.href}>
                                    {c.icon}
                                    <span>{c.title}</span>
                                </Link>
                            )}
                        </Menu.Item>
                    )
                )}

                {saleChannelMenu.map((c: MenuChildType) => (
                    <Menu.Item key={c.href} onClick={() => setOpenKeys([])}>
                        {c.render ? (
                            c.render
                        ) : (
                            <Link to={c.href}>
                                <span
                                    className="nav__icon anticon"
                                    style={{
                                        backgroundImage: `url(${c.icon})`,
                                    }}
                                ></span>
                                <span>{c.title}</span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu>
        </Scrollbar>
    );
};

export default memo(Navigation);
