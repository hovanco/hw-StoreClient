export const dataOptionsAdvanceFilter: IFilterOption[] = [
    { name: 'Giới tính', key: 'gender', used: false },
    { name: 'Ngày tạo', key: 'createdAt', used: false },
    { name: 'Ngày sinh', key: 'dateOfBirth', used: false },
];

export interface IFilterOption {
    name: string;
    key: string;
    used: boolean;
}
