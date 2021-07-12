import React, { FC, memo } from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookIcon } from '../../assets/icon';
import { FACEBOOK_APP_ID, FACEBOOK_SCOPE } from '../../configs/vars';
import './style.less';

interface Props {
    loginFacebook: (data: any) => void;
    title?: string;
}

const LoginFacebookBtn: FC<Props> = ({ loginFacebook, title = '' }): JSX.Element => {
    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID}
            icon={<FacebookIcon />}
            size="small"
            textButton={title}
            autoLoad={false}
            fields="name,email,picture"
            scope={FACEBOOK_SCOPE}
            callback={loginFacebook}
            cssClass="loginFacebook ant-btn ant-btn-primary"
            version="9.0"
        />
    );
};

export default memo(LoginFacebookBtn);
