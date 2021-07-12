export interface IFilterOption {
    id: string;
    name: string;
    used?: boolean;
}

const dataFilterInventory: IFilterOption[] = [
    { id: 'status', name: 'Trạng thái', used: false },
    { id: 'categoryId', name: 'Loại sản phẩm', used: false },
    { id: 'brandId', name: 'Nhãn hiệu', used: false },
];

export default dataFilterInventory;
