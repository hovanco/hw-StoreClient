import React, { ReactNode } from 'react';

import './style.less';

interface IProps {
    children: ReactNode;
}

function Th({ children }: IProps): JSX.Element {
    return <span className="th">{children}</span>;
}

export default Th;
