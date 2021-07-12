export type ISource = 'facebook' | 'pos' | 'shopee';

export interface FilterItem {
    title: string;
    value: string;
}

export interface DataFilterItem {
    title: string;
    value: string;
    filters: {
        label: string;
        items: FilterItem[];
    };
    hide?: boolean;
}

export interface IFilter {
    value: string;
    title: string;
    filters: {
        label: string;
        items: FilterItem[];
    };
    value_filter?: any;
}
