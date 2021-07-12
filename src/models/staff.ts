export enum EUserRole {
    owner,
    manager,
    staff,
}

export interface IStaff {
    _id: string;
    name: string;
    email: string;
    role: EUserRole;
    picture?: string;
    phoneNo?: string;
}
