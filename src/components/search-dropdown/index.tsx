import cls from 'classnames';
import React, { FC, memo, ReactElement, useRef } from 'react';
import useClickOutside from '../../hook/useClickOutside';
import useVisble from '../../hook/useVisible';
import './search-dropdown.less';

interface Props {
    children: ReactElement;
    input: ReactElement;
    className?: string;
}

const SearchDropdown: FC<Props> = ({ children, input, className }) => {
    const elRef = useRef<any>();
    const { visible, setVisible } = useVisble(false);

    useClickOutside(elRef, () => {
        setVisible(false);
    });

    const setHideVisible = () => {
        setVisible(false);
    };

    const classNames = `search-dropdown ${className}`;

    return (
        <div ref={elRef} className={classNames}>
            <div className="input" onClick={() => setVisible(true)}>
                {React.cloneElement(input, {
                    setFocus: () => {
                        setVisible(true);
                    },
                })}
            </div>

            <div className={cls('dropdown', { visible })}>
                {React.cloneElement(children, {
                    setHideVisible,
                })}
            </div>
        </div>
    );
};

export default memo(SearchDropdown);
