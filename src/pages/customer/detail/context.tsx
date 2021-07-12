import React, { FC, useState, useContext, useMemo, createContext } from 'react';

import { ICustomer } from '../../../models';

interface IContext {
    customer: ICustomer;
    setCustomer: (customer: any) => void;
}

const initialContext: IContext = {
    customer: {} as ICustomer,
    setCustomer: (customer: any) => customer,
};

const CustomerContext = createContext(initialContext);

interface Props {
    children: React.ReactNode;
    initCustomer: ICustomer;
}

export const CustomerContextProvider: FC<Props> = ({ children, initCustomer }) => {
    const [customer, setCustomer] = useState<ICustomer>(initCustomer);

    const value = useMemo(
        () => ({
            customer,
            setCustomer,
        }),
        [customer, setCustomer]
    );

    return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};

export const useCustomer = () => {
    const { customer, setCustomer } = useContext(CustomerContext);

    return {
        customer,
        setCustomer,
    };
};
