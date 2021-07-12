export interface Province {
    code: string;
    name: string;
    name_with_type: string;
    slug: string;
    type: string;
}

export interface District {
    code: string;
    name: string;
    name_with_type: string;
    parent_code: string;
    path: string;
    path_with_type: string;
    slug: string;
    type: string;
}
export interface Ward {
    code: string;
    name: string;
    name_with_type: string;
    parent_code: string;
    path: string;
    path_with_type: string;
    slug: string;
    type: string;
}
