import { find, findIndex, pick } from 'lodash';
import { useCallback, useContext } from 'react';
import { mongoObjectId } from '../../../helper';
import { IAttribute, IVariant } from '../../../models';
import { ProductContext } from './context';
import { IAttributeOption } from './interface';
import types from './type';

const useAttribute = () => {
    const { state, dispatch } = useContext(ProductContext);
    const isLocalAttributeSign = 'isLocalAttributeSign';

    const setAttributes = useCallback((attributes: IAttribute[]) => {
        dispatch({
            type: types.SET_ATTRIBUTES,
            payload: attributes || [],
        });

        // eslint-disable-next-line
    }, []);

    const addAttribute = useCallback(() => {
        dispatch({
            type: types.ADD_ATTRIBUTES,
            payload: {
                ...pick(state.attributeOptions[0], ['_id', 'name', isLocalAttributeSign]),
                tags: [],
            },
        });

        // eslint-disable-next-line
    }, [state.attributeOptions]);

    const updateAttribute = useCallback(
        (newAttribute: IAttribute) => {
            let newAttributes: IAttribute[] = [...state.attributes];

            let idx = findIndex(state.attributes, ['_id', newAttribute._id]);

            newAttributes[idx] = {
                ...pick(newAttribute, ['_id', 'name', 'tags', isLocalAttributeSign]),
            } as IAttribute;

            dispatch({
                type: types.SET_ATTRIBUTES,
                payload: newAttributes,
            });
        },
        // eslint-disable-next-line
        [state.attributes]
    );

    const removeAttribute = useCallback(
        (attributeIdx: number) => {
            let newAttributes: IAttribute[] = [...state.attributes];

            newAttributes.splice(attributeIdx, 1);

            dispatch({
                type: types.SET_ATTRIBUTES,
                payload: newAttributes,
            });
        },
        // eslint-disable-next-line
        [state.attributes]
    );

    const changeAttribute = useCallback(
        (oldAttribute: IAttributeOption, newId: string) => {
            if (oldAttribute._id === newId) return;

            let oldAttributeIdx = findIndex(state.attributes, ['_id', oldAttribute._id]);
            let newAttributes = [...state.attributes];
            if (newId !== 'new-option') {
                let newAttribute = find(state.attributeOptions, ['_id', newId]);

                newAttributes.splice(oldAttributeIdx, 1, {
                    ...pick(newAttribute, ['_id', 'name', isLocalAttributeSign]),
                    tags: [],
                } as IAttribute);
            } else {
                if (!oldAttribute[isLocalAttributeSign]) {
                    newAttributes.splice(oldAttributeIdx, 1, {
                        _id: mongoObjectId(),
                        name: '',
                        tags: [],
                        [isLocalAttributeSign]: true,
                    } as IAttribute);
                }
            }

            dispatch({
                type: types.SET_ATTRIBUTES,
                payload: newAttributes,
            });
        },
        // eslint-disable-next-line
        [state.attributeOptions]
    );

    const removeAttributesInEditMode = useCallback(
        (removedAttributesId: string[]) => {
            let newVariants = state.variants.map((variant: IVariant) => {
                let newVariantAttributes = variant.attributes.filter(
                    (attribute: IAttribute) => removedAttributesId.indexOf(attribute._id) !== -1
                );

                return {
                    ...variant,
                    attributes: newVariantAttributes,
                };
            });

            let newAttributes = state.attributes.filter(
                (attribute: IAttribute) => removedAttributesId.indexOf(attribute._id) !== -1
            );

            dispatch({
                type: types.SET_VARIANTS,
                payload: newVariants,
            });

            setAttributes([...newAttributes]);
        },
        // eslint-disable-next-line
        [state.variants, state.attributes]
    );

    return {
        attributes: state.attributes,
        attributeOptions: state.attributeOptions,
        setAttributes,
        addAttribute,
        updateAttribute,
        removeAttribute,
        changeAttribute,
        removeAttributesInEditMode,
        isLocalAttributeSign,
    };
};

export default useAttribute;
