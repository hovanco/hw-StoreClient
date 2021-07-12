import jwtDecode from 'jwt-decode';
import { get } from 'lodash';

export interface IToken {
    accessToken: string;
    refreshToken: string;
    expiredIn: number;
    type: string;
}

const setToken = ({ token, remember = true }: { token?: IToken; remember?: boolean }): void => {
    if (!token) {
        return;
    }

    const tokenString = JSON.stringify(token);

    if (remember) {
        return localStorage.setItem('token', tokenString);
    }

    return sessionStorage.setItem('token', tokenString);
};

const getToken = (): IToken | null => {
    const tokenString = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!tokenString) {
        return null;
    }

    const token: IToken = JSON.parse(tokenString);

    return token;
};

const removeToken = (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

const checkToken = (type: 'accessToken' | 'refreshToken'): boolean => {
    const token = getToken();

    if (!token) {
        return false;
    }

    const tokenDecode = jwtDecode(token[type]);
    const dateNow = Math.floor(Date.now() / 1000);

    if (get(tokenDecode, 'exp') - dateNow > 0) {
        return true;
    }

    return false;
};

export { setToken, getToken, removeToken, checkToken };
