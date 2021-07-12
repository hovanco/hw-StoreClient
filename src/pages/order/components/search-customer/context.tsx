import React, { createContext, FC, ReactNode, useContext } from 'react';
import { ICustomer } from '../../../../models';

interface ISearchCustomerContext {
    selectCustomer: (customer: ICustomer) => void;
}

const initialContext = {
    selectCustomer: (customer: ICustomer) => {},
};

const SearchCustomerContext = createContext<ISearchCustomerContext>(initialContext);

interface Props {
    children: ReactNode;
    selectCustomer: (customer: ICustomer) => void;
}

const ProviderSearchCustomer: FC<Props> = ({ children, selectCustomer }) => {
    return (
        <SearchCustomerContext.Provider
            value={{
                selectCustomer,
            }}
        >
            {children}
        </SearchCustomerContext.Provider>
    );
};

const useSearchCustomer = () => {
    const { selectCustomer } = useContext(SearchCustomerContext);

    return {
        selectCustomer,
    };
};

export { ProviderSearchCustomer as default, useSearchCustomer };
