import React from 'react';
import './style.less';
import logoSrc from '../../assets/images/logo2.png';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link to="/" className="logo">
            <img src={logoSrc} alt="Insa" />
        </Link>
    );
}

export default Logo;
