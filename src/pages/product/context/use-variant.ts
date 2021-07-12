import { useCallback, useContext, useEffect } from 'react';

import { mongoObjectId } from '../../../helper';
import { generateVariantsByTags } from '../product-new/helper';
import { IVariant, IAttribute } from '../../../models';
import types from './type';
import { findIndex } from 'lodash';

import { ProductContext } from './context';
import { IAttributeOption } from './interface';

const useVariant = () => {
    const { state, dispatch, form, isCreateMode } = useContext(ProductContext);

    useEffect(() => {
        if (isCreateMode === true) {
            if (!state.attributes.length) setVariants([]);
            else {
                let newVariantGenereted = generateVariants(state.attributes);
                let variantsHavePrice = [...state.variants].filter(
                    (item: IVariant) => item.price && item.price > 0
                );

                variantsHavePrice.forEach((item: any) => {
                    let itemIdxWillMapPrice = findIndex(newVariantGenereted, (o: any) => {
                        let result = true;
                        item.localId.forEach((h: any) => {
                            result = result && o.localId.includes(h);
                        });
                        return result;
                    });

                    if (itemIdxWillMapPrice !== -1)
                        newVariantGenereted.splice(itemIdxWillMapPrice, 1, {
                            ...newVariantGenereted[itemIdxWillMapPrice],
                            price: item.price,
                            wholesalePrice: item.wholesalePrice,
                        });
                });

                setVariants(newVariantGenereted);
            }
        }

        // eslint-disable-next-line
    }, [state.attributes, isCreateMode]);

    const setVariants = useCallback((variants: IVariant[]) => {
        dispatch({
            type: types.SET_VARIANTS,
            payload: variants,
        });

        // eslint-disable-next-line
    }, []);

    const generateVariants = useCallback((attributeData: IAttribute[]) => {
        let attributeByTags: IAttribute[][] = attributeData.map((attribute: IAttribute) => {
            return attribute.tags.map((tag: string) => ({
                _id: attribute._id,
                name: attribute.name,
                tags: [tag],
            }));
        });

        let attributeByTagsMixed = generateVariantsByTags(attributeByTags) || [];

        let newVariants: IVariant[] = attributeByTagsMixed
            .filter((item: IAttribute[]) => item.length)
            .map((item: IAttribute[]) => {
                return {
                    _id: mongoObjectId(),
                    localId: getLocalIdByAttributes(item),
                    attributes: item,
                    sku: form.getFieldValue('sku'),
                    code: form.getFieldValue('code'),
                    name: form.getFieldValue('name'),
                    length: form.getFieldValue('length') || 0,
                    wholesalePrice: form.getFieldValue('wholesalePrice'),
                    originalPrice: form.getFieldValue('originalPrice'),
                    price: form.getFieldValue('wholesalePrice') || 0,
                    width: form.getFieldValue('width'),
                    height: form.getFieldValue('height'),
                    weight: form.getFieldValue('weight'),
                    images: form.getFieldValue('images'),
                };
            });

        return newVariants;

        // eslint-disable-next-line
    }, []);

    const getLocalIdByAttributes = useCallback((attributes: IAttributeOption[]) => {
        return attributes.map((item: IAttributeOption) => {
            return `${item._id}--${item.tags[0]}`;
        });

        // eslint-disable-next-line
    }, []);

    return {
        variants: state.variants,
        setVariants,
    };
};

export default useVariant;
