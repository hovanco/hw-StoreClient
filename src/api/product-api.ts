import axios from './axios-client';
import { IProduct, IAttribute, IVariant } from '../models';

const basePath = '/store/v1/stores';

export default {
    getProducts: async ({
        storeId,
        page,
        limit,
        categoryId,
        search,
        sort,
        direction,
        withQuantity,
        variant,
        warehouseId,
    }: {
        storeId: string;
        page: number;
        limit: number;
        categoryId?: string;
        search?: string;
        sort?: string;
        direction?: string;
        withQuantity?: boolean;
        variant?: boolean;
        warehouseId?: string;
    }): Promise<{
        data: IProduct[];
        total: number;
    }> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/products`,
            params: {
                page,
                limit,
                categoryId,
                search,
                sort,
                direction,
                withQuantity,
                warehouseId,
                variant,
                createdAt: 'desc',
            },
        });

        return response.data;
    },

    getProduct: async ({
        storeId,
        productId,
    }: {
        storeId: string;
        productId: string;
    }): Promise<IProduct> => {
        const url = `${basePath}/${storeId}/products/${productId}`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response.data;
    },

    updateProduct: async (storeId: string, productId: string, form: any): Promise<IProduct> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}`,
            data: form,
        });

        return response.data;
    },

    deleteProduct: async (storeId: string, productId: string): Promise<any> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/products/${productId}`,
        });

        return response.data;
    },

    createProduct: async (storeId: string, form: IProduct): Promise<IProduct> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/products`,
            data: form,
        });

        return response.data;
    },

    getAttributes: async (storeId: string): Promise<IAttribute[]> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/attributes`,
        });

        return response.data;
    },

    createAttribute: async (storeId: string, attribute: IAttribute): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/attributes`,
            data: attribute,
        });

        return response.data;
    },

    editVariant: async (
        storeId: string,
        productId: string,
        productVariantId: string,
        variant: any
    ): Promise<IVariant> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${productVariantId}`,
            data: variant,
        });

        return response.data;
    },

    addAttributeProductVariants: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<{ success: boolean }> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/add`,
            data: { attributes },
        });

        return response.data;
    },

    deleteVariant: async (
        storeId: string,
        productId: string,
        productVariantId: string
    ): Promise<number> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${productVariantId}`,
        });

        return response.data;
    },

    replaceAttributeByNewOne: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<{ success: boolean }> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/replace`,
            data: { attributes },
        });

        return response.data;
    },

    changeOrderAttributesAndTags: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<{ success: boolean }> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/sort`,
            data: { attributes },
        });

        return response.data;
    },

    createVariant: async (
        storeId: string,
        productId: string,
        variant: IVariant
    ): Promise<IVariant> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/products/${productId}/product-variants`,
            data: variant,
        });

        return response.data;
    },

    updateVariant: async (
        storeId: string,
        productId: string,
        variantId: string,
        variant: IVariant
    ): Promise<IVariant> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${variantId}`,
            data: variant,
        });

        return response.data;
    },
};
