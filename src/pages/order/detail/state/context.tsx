import React, { useMemo, useReducer, createContext, FC, ReactNode, useContext } from 'react';

interface IState {
    isCancel: boolean;
}

interface IAction {
    type: string;
    payload?: any;
}

const initialState: IState = {
    isCancel: false,
};

const types = {
    UPDATE_SEND_SHIP: 'order-detail/update-send-ship',
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.UPDATE_SEND_SHIP:
            return {
                ...state,
                isCancel: action.payload,
            };
        default:
            return state;
    }
};

const initialContext = {
    state: initialState,
    dispatch: () => {},
    loadOrder: () => {},
};

interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
    loadOrder: any;
}

const ContextDetailOrder = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
    loadOrder: (orderId: string) => void;
}

const ProviderDetailOrder: FC<Props> = ({ children, loadOrder }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ state, dispatch, loadOrder }), [state, loadOrder, dispatch]);

    return <ContextDetailOrder.Provider value={value}>{children}</ContextDetailOrder.Provider>;
};

const useOrderDetail = () => {
    const { state, dispatch, loadOrder } = useContext(ContextDetailOrder);

    const toggleUpdateSendShip = (value: boolean) => {
        dispatch({ type: types.UPDATE_SEND_SHIP, payload: value });
    };

    return {
        ...state,
        toggleUpdateSendShip,
        loadOrder,
    };
};

export { ProviderDetailOrder, useOrderDetail };
