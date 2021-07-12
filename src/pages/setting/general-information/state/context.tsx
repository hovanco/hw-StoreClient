import React, { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { getBillingPackages } from '../../../../api/billing-api';
import { IPackageBiling } from '../../list-billings/package-biling';
import { IContext } from './interface';
import reducer, { initialReducer } from './reducer';
import types from './types';

const initialContext = {
    state: initialReducer,
    dispatch: () => {},
};

const CreateBillingContext = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
    packagesSelect?: string;
    billingCycle?: string;
}

const ProviderBillingContext: FC<Props> = ({ children, packagesSelect, billingCycle }) => {
    const [state, dispatch] = useReducer(reducer, initialReducer);

    const getPackages = async () => {
        const response = await getBillingPackages();
        const currentPackage = response.find(
            (item: IPackageBiling) => item.code === Number(packagesSelect)
        );
        const initialState = {
            packagesSelect: currentPackage ? [currentPackage] : [],
            billingCycle: billingCycle ? parseFloat(billingCycle) : null,
            packages: response,
        };
        dispatch({
            type: types.INIT_STATE,
            payload: initialState,
        });
    };

    useEffect(() => {
        getPackages();
        // eslint-disable-next-line
    }, []);

    return (
        <CreateBillingContext.Provider value={{ state, dispatch }}>
            {children}
        </CreateBillingContext.Provider>
    );
};

const useBilling = () => {
    const value = useContext(CreateBillingContext);

    const { state, dispatch } = value;

    const updatePackages = (data: any) => {
        let packagesSelect = [...state.packagesSelect];
        const isExist = packagesSelect.some((item) => item.code === data.code);
        if (isExist) {
            packagesSelect = packagesSelect.filter((item) => item.code !== data.code);
        } else {
            packagesSelect.push(data);
        }
        dispatch({
            type: types.UPDATE_PACKAGES,
            payload: packagesSelect,
        });
    };

    const changeValueField = (data: { field: string; value: any }) => {
        dispatch({
            type: types.CHANGE_VALUE_FIELD,
            payload: data,
        });
    };

    const initOrderState = (data: any) => {
        dispatch({
            type: types.INIT_STATE,
            payload: data,
        });
    };

    return {
        ...state,
        changeValueField,
        initOrderState,
        updatePackages,
    };
};

export { ProviderBillingContext as default, useBilling };
