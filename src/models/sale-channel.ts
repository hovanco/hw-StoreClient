export enum SaleChannelId {
    POS = 'pos',
    FACEBOOK = 'facebook',
    SHOPEE = 'shopee',
    INSAWEB = 'insa',
    TIKI = 'tiki',
}

export interface SaleChannel {
    id: SaleChannelId;
    title: string;
    menuTitle: string;
    href: string;
    description: string;
    used: boolean;
    icon: string;
    hide?: boolean;
}
