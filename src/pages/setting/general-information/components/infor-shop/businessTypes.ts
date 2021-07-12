import { EBusinessType } from '../../../../../models';

interface IBusinessType {
    value: EBusinessType;
    title: string;
}

const businessTypes: IBusinessType[] = [
    {
        value: EBusinessType.Fashion,
        title: 'Thời trang',
    },
    {
        value: EBusinessType.MomAndBaby,
        title: 'Mẹ và bé',
    },
    {
        value: EBusinessType.Accessories,
        title: 'Phụ kiện',
    },
    {
        value: EBusinessType.Furniture,
        title: 'Nội thất',
    },
    {
        value: EBusinessType.Food,
        title: 'Thực phẩm',
    },
    {
        value: EBusinessType.Cosmetic,
        title: 'Mỹ phẩm',
    },
    {
        value: EBusinessType.Services,
        title: 'Dịch vụ',
    },
    {
        value: EBusinessType.Others,
        title: 'Khác',
    },
];

export { businessTypes };
