const prod = process.env.NODE_ENV === 'production';

const URL_API = process.env.REACT_APP_API_URI;
const URL_AUTH = process.env.REACT_APP_AUTH_URL;
const URL_CLIENT = prod ? process.env.REACT_APP_URL_CLIENT : 'https://localhost:3000';

const FB = {
    FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    FACEBOOK_SECRET_KEY: process.env.REACT_APP_FACEBOOK_SECRET_KEY,
};

const URL_IMG = process.env.REACT_APP_IMG_URL;
const INSA_FACEBOOK_PAGE = process.env.REACT_APP_INSA_FACEBOOK_PAGE;
const INSA_HOMEPAGE = process.env.REACT_APP_INSA_HOMEPAGE;

const IS_DEV = process.env.REACT_APP_DEV;

const constants = {
    title: 'Insa',
    URL_API,
    FB,
    URL_CLIENT,
    URL_IMG,
    URL_AUTH,
    INSA_FACEBOOK_PAGE,
    INSA_HOMEPAGE,
    IS_DEV,
};

export default constants;
