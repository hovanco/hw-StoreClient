import React, { createContext, FC, ReactNode, useContext, useMemo, useReducer } from 'react';
import { IContextDeliveris } from './interface';
import reducer, { initialDeliveriesState } from './reducer';

const initialDeliveryContext = {
    state: initialDeliveriesState,
    dispatch: () => {},
};

const DeliveriesContext = createContext<IContextDeliveris>(initialDeliveryContext);

interface Props {
    children: ReactNode;
}

const ProviderDeliveries: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialDeliveriesState);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <DeliveriesContext.Provider value={value}>{children}</DeliveriesContext.Provider>;
};

const useDeliveries = () => {
    const value = useContext(DeliveriesContext);

    const { state, dispatch } = value;

    return { ...state };
};

export { ProviderDeliveries as default, useDeliveries };
