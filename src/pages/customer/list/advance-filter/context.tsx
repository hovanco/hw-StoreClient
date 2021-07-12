import React, { FC, useState, createContext, useContext } from 'react';

interface iPopover {
    visible: boolean;
    setVisible: Function;
}

const initialPopover: iPopover = {
    visible: false,
    setVisible: (visible: any) => visible,
};

const PopoverContext = createContext(initialPopover);

interface Props {
    children: JSX.Element;
}

export const PopoverProvider: FC<Props> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const value = {
        visible,
        setVisible,
    };

    return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};

export const usePopover = () => {
    const { visible, setVisible } = useContext(PopoverContext);

    const toggle = () => setVisible(!visible);

    return {
        visible,
        toggle,
    };
};
