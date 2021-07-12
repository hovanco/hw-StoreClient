import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import classnames from 'classnames';
import React, { FC, forwardRef, memo } from 'react';
import './insa-button.less';

/* interface IInsaButton extends ButtonProps { */
/*     ref?: RefAttributes<HTMLElement>; */
/* } */

/* ref={ref?.ref} */

interface Props extends ButtonProps {}

const InsaButton: FC<Props> = forwardRef(({ className, ...props }, ref) => {
    return (
        <Button
            ref={ref && undefined}
            className={classnames(`insa-button ${className}`)}
            {...props}
        />
    );
});

export default memo(InsaButton);
