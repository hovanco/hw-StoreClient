import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import * as queryString from 'query-string';

export interface IToken {
    accessToken: string;
    refreshToken: string;
    expiredIn: number;
    type: string;
}

const setToken = ({ token, remember = true }: { token: IToken; remember?: boolean }): void => {
    const tokenString = JSON.stringify(token);

    if (remember) {
        return localStorage.setItem('token', tokenString);
    }

    return sessionStorage.setItem('token', tokenString);
};

const getTokenLocal = (): IToken | null => {
    const tokenString = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!tokenString) return null;

    const token: IToken = JSON.parse(tokenString);

    return token;
};

const getToken = (type?: 'accessToken' | 'refreshToken'): string | null => {
    const tokenLocal = getTokenLocal();

    if (!tokenLocal) return null;

    return get(tokenLocal, type || 'accessToken');
};

const getAuthParam = (): string | null => {
    const token = getToken('accessToken');

    if (!token) return null;

    const search = queryString.stringify({
        token,
        location: JSON.stringify({
            pathname: '/',
        }),
    });
    return search;
};

const removeToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

const checkToken = (token: string): boolean => {
    const tokenDecode = jwtDecode(token);
    const expToken = get(tokenDecode, 'exp');

    if (!expToken) {
        return false;
    }

    const dateNow = Math.floor(Date.now() / 1000);

    return expToken - dateNow > 0;
};

export { setToken, getToken, removeToken, getAuthParam, checkToken, getTokenLocal };
