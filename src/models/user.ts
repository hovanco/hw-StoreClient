export interface IUser {
    _id: string;
    permissions: string[];
    email: string;
    name: string;
    picture?: string;
}
