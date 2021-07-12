import insaFacebookIcon from '../assets/images/ic-insa-facebook.svg';
import insaPosIcon from '../assets/images/ic-insa-pos.svg';
import insaShopeeIcon from '../assets/images/ic-insa-shopee.svg';
import insaFacebook from '../assets/images/insa-fb-logo.svg';
import insaPos from '../assets/images/insa-pos-logo.svg';
import insaShopee from '../assets/images/insa-shopee-logo.svg';
import constants from '../constants';
import { IPackage } from '../pages/setting/create-billing/state/interface';
import axiosClient from './axios-client';

export enum EBillingPackageType {
    Trial = 1 << 0,
    Omni = 1 << 1,
    Pos = 1 << 2,
    Facebook = 1 << 3,
    Shopee = 1 << 4,
}

export const BillingPeriods = {
    OneMonth: 1,
    SixMonths: 6,
    OneYear: 12,
};

export const ColorPackage = {
    [EBillingPackageType.Pos]: '#6c6fbf',
    [EBillingPackageType.Shopee]: '#f53d2d',
    [EBillingPackageType.Facebook]: '#1877F2',
    [EBillingPackageType.Omni]: '#0885fb',
};

export const AliasPackage = {
    [EBillingPackageType.Pos]: 'INSA POS',
    [EBillingPackageType.Facebook]: 'INSA FACEBOOK',
    [EBillingPackageType.Trial]: 'INSA TRIAL',
    [EBillingPackageType.Shopee]: 'INSA SHOPEE',
    [EBillingPackageType.Omni]: 'OMNI',
};

export const BillingPricePerMonth = {
    [EBillingPackageType.Pos]: 199000,
    [EBillingPackageType.Facebook]: 199000,
    [EBillingPackageType.Shopee]: 199000,
    [EBillingPackageType.Omni]: 199000 * 2, //499000
};

export const EBillingPaymentType = {
    BankTransfer: 1,
    OnlinePayment: 2,
};

export const EBillingPaymentTypeName = {
    [EBillingPaymentType.BankTransfer]: 'Chuyển khoản',
    [EBillingPaymentType.OnlinePayment]: 'Thanh toán Online',
};

export const Packages = [
    {
        id: 1,
        code: EBillingPackageType.Pos,
        alias: 'INSA POS',
        package: 'Gói Insa POS',
        name: 'Phần mềm quản lý bán hàng',
        price: BillingPricePerMonth[EBillingPackageType.Pos],
        unit: 'VNĐ/ THÁNG',
        color: ColorPackage[EBillingPackageType.Pos],
        logo: insaPos,
        icon: insaPosIcon,
        description: `Sản phẩm không giới hạn
            1 Cửa hàng
            Quản lý kho
            Quản lý nhân viên
            Báo cáo bán hàng
            Kết nối thiết bị bán hàng`,
        mostPopular: false,
        cycles: [
            {
                id: BillingPeriods.OneMonth,
                name: '1 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Pos],
            },
            {
                id: BillingPeriods.SixMonths,
                name: '6 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Pos] * 6,
            },
            {
                id: BillingPeriods.OneYear,
                name: '12 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Pos] * 12,
            },
        ],
    },
    {
        id: 2,
        code: EBillingPackageType.Facebook,
        alias: 'INSA FACEBOOK',
        package: 'Gói Insa facebook',
        name: 'Quản lý bán hàng online',
        price: BillingPricePerMonth[EBillingPackageType.Facebook],
        unit: 'VNĐ/ THÁNG',
        color: ColorPackage[EBillingPackageType.Facebook],
        logo: insaFacebook,
        icon: insaFacebookIcon,
        description: `Sản phẩm không giới hạn
            Bán hàng trên Facebook
            Facebook chatbot marketing
            Tự động chốt đơn livestream
            Quản lý 5 fanpages, 15 users
            Báo cáo bán hàng`,
        mostPopular: false,
        cycles: [
            {
                id: BillingPeriods.OneMonth,
                name: '1 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Facebook],
            },
            {
                id: BillingPeriods.SixMonths,
                name: '6 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Facebook] * 6,
            },
            {
                id: BillingPeriods.OneYear,
                name: '12 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Facebook] * 12,
            },
        ],
    },
    {
        id: 3,
        code: EBillingPackageType.Shopee,
        alias: 'INSA SHOPEE',
        package: 'Gói Insa shopee',
        name: 'Quản lý bán hàng shopee',
        price: BillingPricePerMonth[EBillingPackageType.Shopee],
        unit: 'VNĐ/ THÁNG',
        color: ColorPackage[EBillingPackageType.Shopee],
        logo: insaShopee,
        icon: insaShopeeIcon,
        description: `Sản phẩm không giới hạn
            1 website bán hàng
            Dung lượng 5G
            Thanh toán trực tuyến
            5 email tên miền
            Kho ứng dụng`,
        mostPopular: false,
        cycles: [
            {
                id: BillingPeriods.OneMonth,
                name: '1 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Shopee],
            },
            {
                id: BillingPeriods.SixMonths,
                name: '6 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Shopee] * 6,
            },
            {
                id: BillingPeriods.OneYear,
                name: '12 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Shopee] * 12,
            },
        ],
        hidden: constants.IS_DEV,
    },
    {
        id: 4,
        code: EBillingPackageType.Omni,
        alias: 'OMNI',
        package: 'Gói OMNI',
        name: 'Quản lý và bán hàng đa kênh',
        price: BillingPricePerMonth[EBillingPackageType.Omni],
        unit: 'VNĐ/ THÁNG',
        color: ColorPackage[EBillingPackageType.Omni],
        description: `Sản phẩm không giới hạn
            1 cửa hàng
            1 website bán hàng
            Bán hàng trên Facebook
            Báo cáo bán hàng đa kênh
            Đồng bộ hàng hóa lên các kênh`,
        mostPopular: true,
        cycles: [
            {
                id: BillingPeriods.OneMonth,
                name: '1 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Omni],
            },
            {
                id: BillingPeriods.SixMonths,
                name: '6 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Omni] * 6,
            },
            {
                id: BillingPeriods.OneYear,
                name: '12 tháng',
                price: BillingPricePerMonth[EBillingPackageType.Omni] * 12,
            },
        ],
    },
];

export const PackagesVisible = Packages.filter((item) => {
    if (typeof item.hidden === 'string' && item.hidden === 'true') return false;
    return true;
});

export async function getBillingPackages(): Promise<any> {
    const response = await new Promise((resolve) => {
        resolve(PackagesVisible);
    });
    return response;
}

export async function createTransactionCode(idStore: string, data: any): Promise<string> {
    const response = await axiosClient({
        method: 'POST',
        url: `/store/v1/stores/${idStore}/billing-stores/generate-transaction-code`,
        data,
    });

    return response.data;
}

export interface FormBuy {
    period: number;
    packageType: EBillingPackageType;
    transactionCode: string;
    paymentType: number;
}

export async function createBuyOrder(idStore: string, data: FormBuy): Promise<any> {
    const response = await axiosClient({
        method: 'POST',
        url: `/store/v1/stores/${idStore}/billing-stores`,
        data,
    });

    return response.data;
}

export async function getPackagesActive(idStore: string): Promise<IPackage[]> {
    const response = await axiosClient({
        method: 'GET',
        url: `/store/v1/stores/${idStore}/billing-stores`,
    });

    return response.data;
}

export async function getHistoryPayment(idStore: string): Promise<IPackage[]> {
    const response = await axiosClient({
        method: 'GET',
        url: `/store/v1/stores/${idStore}/billing-stores/history`,
    });

    return response.data;
}

export async function getPendingBilling(idStore: string): Promise<IPackage[]> {
    const response = await axiosClient({
        method: 'GET',
        url: `/store/v1/stores/${idStore}/billing-stores/pending-billings`,
    });

    return response.data;
}
