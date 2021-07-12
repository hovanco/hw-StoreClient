import React, { FC, createContext, useMemo, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';

import reducer, { initialReducer } from './reducer';
import { IContext, IAttributeOption } from './interface';
import { FormInstance } from 'antd/lib/form';
import types from './type';
import { pick } from 'lodash';

const initialContext = {
    state: initialReducer,
    dispatch: () => {},
    form: {} as FormInstance,
};

export const ProductContext = createContext<IContext>(initialContext);

interface Props {
    form: FormInstance;
    isCreateMode?: boolean;
    children: React.ReactNode;
}

export const ProductContextProvider: FC<Props> = ({ form, isCreateMode = false, children }) => {
    const [state, dispatch] = useReducer(reducer, initialReducer);
    const listAttribute: IAttributeOption[] = useSelector(
        (state: any) => state.store.attributes.data
    );

    useEffect(() => {
        if (listAttribute.length && isCreateMode) {
            dispatch({
                type: types.ADD_ATTRIBUTES,
                payload: {
                    ...pick(listAttribute[0], ['_id', 'name']),
                    tags: [],
                },
            });
        }
    }, [listAttribute, isCreateMode]);

    useEffect(() => {
        let newOptionData: IAttributeOption[] = listAttribute;

        if (state.attributes.length) {
            newOptionData = listAttribute.filter(
                (attribute: any) =>
                    state.attributes.map((i: any) => i._id).indexOf(attribute._id) === -1
            );
        }

        dispatch({
            type: types.SET_ATTRIBUTE_OPTIONS,
            payload: newOptionData,
        });
    }, [state.attributes, listAttribute]);

    useEffect(() => {
        form.setFieldsValue({
            ...pick(state, ['variants', 'attributes', 'stocks']),
        });
    }, [state.variants, state.attributes, state.stocks]);

    const value = useMemo(() => ({ state, dispatch, form, isCreateMode }), [
        state,
        form,
        isCreateMode,
    ]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
