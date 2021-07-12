import { GooglePlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, memo } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { GOOGLE_APP_ID } from '../../configs/vars';

import './style.less';
interface Props {
    style?: {};
    loginGoogle: (arg: any) => void;
    title?: string;
}

const LoginGoogleBtn: FC<Props> = ({ style, loginGoogle, title = '' }): JSX.Element => {
    // const { signIn, loaded } = useGoogleLogin({
    const { signIn } = useGoogleLogin({
        clientId: GOOGLE_APP_ID,
        onSuccess: loginGoogle,
        onFailure: () => {},
    });

    return (
        <Button
            type="primary"
            danger
            icon={<GooglePlusOutlined />}
            onClick={signIn}
            style={{ ...style }}
            className="loginGoogle"
        >
            {title}
        </Button>
    );
};

export default memo(LoginGoogleBtn);
