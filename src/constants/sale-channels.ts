import { SaleChannel, SaleChannelId } from '../models/sale-channel';

import iconInsaWeb from '../assets/images/ic-insa-web.svg';
import iconFacebookSocial from '../assets/images/ic-insa-facebook.svg';
import iconShopeeSocial from '../assets/images/ic-insa-shopee.svg';
import iconTikiSocial from '../assets/tiki@2x.png';
import iconInsaPOS from '../assets/images/ic-insa-pos.svg';

export const SALE_CHANNEL_DATA: SaleChannel[] = [
    {
        id: SaleChannelId.POS,
        title: 'INSA POS - NỀN TẢNG BÁN HÀNG TIỆN DỤNG',
        menuTitle: 'Insa Pos',
        href: '/sale-channel/pos',
        description:
            'Bán hàng trực tuyến chuyên nghiệp được tích hợp sẵn các phương thức vận chuyển, thanh toán, hỗ trợ khách hàng',
        used: false,
        icon: iconInsaPOS,
    },
    {
        id: SaleChannelId.FACEBOOK,
        title: 'FACEBOOK - KÊNH BÁN HÀNG TRAFFIC CAO NHẤT',
        menuTitle: 'Insa Facebook',
        href: '/sale-channel/facebook',
        description:
            'Bán hàng trực tuyến chuyên nghiệp được tích hợp sẵn các phương thức vận chuyển, thanh toán, hỗ trợ khách hàng',
        used: false,
        icon: iconFacebookSocial,
    },
    {
        id: SaleChannelId.INSAWEB,
        title: 'INSA WEB - NỀN TẢNG BÁN HÀNG ĐƯỢC CÁ NHÂN HÓA',
        menuTitle: 'Website',
        href: '',
        description:
            'Bán hàng trực tuyến chuyên nghiệp được tích hợp sẵn các phương thức vận chuyển, thanh toán, hỗ trợ khách hàng',
        used: false,
        icon: iconInsaWeb,
    },
    // TODO: Show after add feature
    // {
    //     id: SaleChannelId.SHOPEE,
    //     title: 'SHOPEE - SÀN THƯƠNG MẠI ĐIỆN TỬ TỐT NHẤT',
    //     menuTitle: 'Insa Shopee',
    //     href: '/sale-channel/shoppe',
    //     description:
    //         'Bán hàng trực tuyến chuyên nghiệp được tích hợp sẵn các phương thức vận chuyển, thanh toán, hỗ trợ khách hàng',
    //     used: false,
    //     icon: iconShopeeSocial,
    // },
    {
        id: SaleChannelId.TIKI,
        title: 'TIKI - TÌM KIẾM VÀ TIẾT KIỆM',
        menuTitle: 'Tiki',
        href: '',
        description:
            'Bán hàng trực tuyến chuyên nghiệp được tích hợp sẵn các phương thức vận chuyển, thanh toán, hỗ trợ khách hàng',
        used: false,
        icon: iconTikiSocial,
    },
];
