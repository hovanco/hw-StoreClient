import React from 'react';

import Icon from '@ant-design/icons';

const size = '18px';

const defaultSetting = {
    viewBox: '0 0 1024 1024',
    width: size,
    height: size,
    fill: 'currentColor',
};

const ActionMoreSvg = () => (
    <svg {...defaultSetting} viewBox="0 0 20 20">
        <path id="Rectangle_43" fill="none" d="M0 0H18V18H0z" />
        <g id="Layer" transform="translate(3.75 .75)">
            <g id="Vrstva_100">
                <path
                    id="Path_95"
                    d="M11.25 17a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 17zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -5)"
                />
                <path
                    id="Path_96"
                    d="M11.25 9a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 9zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -3)"
                />
                <path
                    id="Path_97"
                    d="M11.25 1a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 1zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -1)"
                />
            </g>
        </g>
        <g id="Layer-2" transform="translate(9.75 .75)">
            <g id="Vrstva_100-2">
                <path
                    id="Path_95-2"
                    d="M11.25 17a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 17zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -5)"
                />
                <path
                    id="Path_96-2"
                    d="M11.25 9a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 9zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -3)"
                />
                <path
                    id="Path_97-2"
                    d="M11.25 1a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 11.25 1zm0 3a.75.75 0 1 1 .75-.75.75.75 0 0 1-.75.75z"
                    transform="translate(-9 -1)"
                />
            </g>
        </g>
    </svg>
);

export const IconActionMore = (props?: any) => <Icon component={ActionMoreSvg} {...props} />;

export default IconActionMore;
