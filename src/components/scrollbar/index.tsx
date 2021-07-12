import React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

export default ({ children, ...rest }: ScrollbarProps): JSX.Element => {
    return (
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} {...rest}>
            {children}
        </Scrollbars>
    );
};
