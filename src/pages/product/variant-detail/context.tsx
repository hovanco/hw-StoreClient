import React, { createContext, FC, useState, useContext } from 'react';
import { IState } from '../../../store/rootReducer';
import { useSelector } from 'react-redux';
import { find, isEqual } from 'lodash';
import { IAttribute } from '../../../models';

const initialVariant: any = {
    attributes: [],
    code: undefined,
    height: undefined,
    images: [],
    isVariant: true,
    length: undefined,
    name: undefined,
    originalPrice: undefined,
    price: undefined,
    weight: undefined,
    wholesalePrice: undefined,
    width: undefined,
    sku: undefined,
};

const VariantContext = createContext({
    image: undefined,
    setImage: (image: any) => image,
    variant: initialVariant,
    setVariant: (variant: any) => variant,
    attributesToAddNew: [],
    setAttributeToAddNew: (attributesToAddNew: any) => attributesToAddNew,
});

export const VariantContextProvider: FC = ({ children }) => {
    const [variant, setVariant] = useState<any>(initialVariant);
    const [attributesToAddNew, setAttributeToAddNew] = useState<any>([]);
    const [image, setImage] = useState<any>();

    const value = {
        variant,
        attributesToAddNew,
        setVariant,
        setAttributeToAddNew,
        image,
        setImage,
    };

    return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
};

export const useVariant = () => {
    const {
        variant,
        attributesToAddNew,
        setVariant,
        setAttributeToAddNew,
        setImage,
        image,
    } = useContext(VariantContext);
    const attributes = useSelector((state: IState) => state.store.attributes.data);

    const addNewVariant = () => {
        setVariant({
            ...initialVariant,
            attributes: attributesToAddNew,
        });
    };

    const updateNewVariantAttribute = (productAttributes: any) => {
        if (variant.attributes.length) return;
        if (!productAttributes.length) return;

        let newVariantAttibutes = productAttributes.map((attr: any) => {
            let attrInStore: any = find(attributes, ['_id', attr._id]);
            if (attrInStore) return { ...attr, name: attrInStore.name, tags: [] };

            return { ...attr, name: '', tags: [] };
        });

        if (!isEqual(variant.attributes, newVariantAttibutes)) {
            setVariant({ ...variant, attributes: newVariantAttibutes });
        }
    };

    const prepareAttributesToAddNew = (productAttributes: any) => {
        setAttributeToAddNew(productAttributes.map((i: any) => ({ ...i, tags: [] })));
    };

    const updateAttributeTag = (updatedAttribute: IAttribute) => {
        let newAttributes = variant.attributes.map((attribute: IAttribute) => {
            if (updatedAttribute._id === attribute._id) return updatedAttribute;

            return attribute;
        });

        setVariant({ ...variant, attributes: newAttributes });
    };

    return {
        variant,
        setImage,
        image,
        attributesToAddNew,
        setVariant,
        addNewVariant,
        updateNewVariantAttribute,
        prepareAttributesToAddNew,
        updateAttributeTag,
    };
};
