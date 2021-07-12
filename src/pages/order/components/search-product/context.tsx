import React, { createContext, FC, ReactNode, useContext } from 'react';
import { IProductState } from '../../create/state/interface';

const initialContext = {
    selectProduct: (product: IProductState) => {},
};

const Context = createContext(initialContext);

interface Props {
    children: ReactNode;
    selectProduct: (product: IProductState) => void;
}

const ProviderContext: FC<Props> = ({ children, selectProduct }) => {
    const value = { selectProduct };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSearchProduct = () => {
    const values = useContext(Context);
    return {
        ...values,
    };
};

export default ProviderContext;
