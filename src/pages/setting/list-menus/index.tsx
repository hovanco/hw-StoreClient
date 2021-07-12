import { QuestionCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import icActionsSettings from '../../../assets/images/ic-actions-settings.svg';
import icActionsTimer from '../../../assets/images/ic-actions-timer.svg';
import icContactMapPin from '../../../assets/images/ic-contact-map-pin.svg';
import icEcommerceCard from '../../../assets/images/ic-ecommerce-card-setting.svg';
import icEcommerceDelivery from '../../../assets/images/ic-ecommerce-delivery-setting.svg';
import icEditorTable from '../../../assets/images/ic-editor-table.svg';
import icPlacesMall from '../../../assets/images/ic-places-mall.svg';
import icStatisticsAssignment from '../../../assets/images/ic-statistics-assignment.svg';
import icStatisticsSalesChannel from '../../../assets/images/ic-statistics-sales-channel.svg';
import icStatisticsWorkflow from '../../../assets/images/ic-statistics-workflow.svg';
import icUsersInfo from '../../../assets/images/ic-users-info.svg';
import icWallet from '../../../assets/images/ic-wallet.svg';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import SettingGroup from './setting-group';
import './style.less';

const { Title } = Typography;

export interface IMenuSetting {
    hide: boolean;
    icon: string;
    name: string;
    description: string;
    path: string;
}

export interface IGroupSetting {
    hide: boolean;
    name: string;
    items: IMenuSetting[];
}

export const settingList: IGroupSetting[] = [
    {
        hide: false,
        name: 'Cài đặt chung',
        items: [
            {
                hide: false,
                icon: icActionsSettings,
                name: 'Thông tin chung',
                description: 'Cập nhật thông tin cửa hàng, tiền tệ và ngôn ngữ mặc định',
                path: '/setting/general-information',
            },
            {
                hide: false,
                icon: icUsersInfo,
                name: 'Tài khoản & nhân viên',
                description: 'Quản lý tài khoản, nhân viên và phân quyền',
                path: '/setting/account',
            },
            {
                hide: true,
                icon: icStatisticsWorkflow,
                name: 'Nhóm tài khoản',
                description: 'Quản lý nhóm quyền tài khoản ',
                path: '/setting',
            },
            {
                hide: true,
                icon: icStatisticsAssignment,
                name: 'Nhóm phân công',
                description: 'Quản lý phân công tài khoản',
                path: '/setting',
            },
            {
                hide: false,
                icon: icStatisticsSalesChannel,
                name: 'Kênh bán hàng',
                description: 'Quản lý, kết nối các kênh bán hàng bạn đang sử dụng',
                path: '/setting/sale-channel',
            },
            {
                hide: true,
                icon: icEcommerceDelivery,
                name: 'Vận chuyển',
                description: 'Quản lý, cài dặt phương thức, đơn vị vận chuyển',
                path: '/setting',
            },
            {
                hide: false,
                icon: icContactMapPin,
                name: 'Quản lý chi nhánh',
                description: 'Thêm và chỉnh sửa thông tin chi nhánh',
                path: '/setting/warehouse',
            },
            {
                hide: true,
                icon: icEcommerceCard,
                name: 'Thanh toán',
                description: 'Cài đặt các hình thức thanh toán',
                path: '/setting',
            },
            {
                hide: false,
                icon: icWallet,
                name: 'Gói dịch vụ và thanh toán',
                description: 'Quản lý thông tin thanh toán và gói dịch vụ',
                path: '/setting/billings/list',
            },
            {
                hide: true,
                icon: icPlacesMall,
                name: 'Thiết lập quản lý kho',
                description: 'Điều chỉnh các thông tin mặc định khi bán hàng và quản lý kho',
                path: '/setting',
            },
        ],
    },
    {
        hide: true,
        name: 'Lịch sử',
        items: [
            {
                hide: false,
                icon: icEditorTable,
                name: 'Lịch sử nhập/ xuất file',
                description: 'Theo dõi và quản lý lịch sử nhập/ xuất file trong cửa hàng ',
                path: '/setting',
            },
            {
                hide: false,
                icon: icActionsTimer,
                name: 'Nhật ký hoạt động',
                description: 'Quản lý thao tác, nhật ký hoạt động trong cửa hàng',
                path: '/setting',
            },
        ],
    },
];

function SettingList() {
    return (
        <DefaultLayout title="Cài đặt">
            <div className="settings-page">
                <PageTopWrapper
                    leftContent={<Title level={3}>CÀI ĐẶT</Title>}
                    // TODO: Show after add feature
                    // rightContent={
                    //     <InsaButton icon={<QuestionCircleOutlined />}>Trợ giúp</InsaButton>
                    // }
                />
                <div className="content">
                    {settingList.map((group: IGroupSetting, index: number) => (
                        <SettingGroup group={group} key={index} />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default SettingList;
