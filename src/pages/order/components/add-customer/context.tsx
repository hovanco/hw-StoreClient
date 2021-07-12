import React, { createContext, FC, ReactNode, useContext } from 'react';
import { ICustomer } from '../../../../models';

interface IAddCustomerContext {
    selectCustomer: (customer: ICustomer) => void;
}

const initialContext = {
    selectCustomer: (customer: ICustomer) => {},
};

const AddCustomerContext = createContext<IAddCustomerContext>(initialContext);

interface Props {
    children: ReactNode;
    selectCustomer: (customer: ICustomer) => void;
}

const ProviderAddCustomer: FC<Props> = ({ children, selectCustomer }) => {
    return (
        <AddCustomerContext.Provider
            value={{
                selectCustomer,
            }}
        >
            {children}
        </AddCustomerContext.Provider>
    );
};

const useAddCustomer = () => {
    const { selectCustomer } = useContext(AddCustomerContext);

    return {
        selectCustomer,
    };
};

export { ProviderAddCustomer as default, useAddCustomer };
