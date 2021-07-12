import { debounce } from 'lodash';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import productApi from '../../../../api/product-api';
import SearchDropdown from '../../../../components/search-dropdown';
import { IProduct } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import { IProductState } from '../../create/state/interface';
import ProviderContext from './context';
import InputSearch from './input-search';
import ProductsDropdown from './products-dropdown';
import './search-product.less';

interface Props {
    selectProduct: (product: IProductState) => void;
    warehouseId?: string;
}

const SearchProduct: FC<Props> = ({ selectProduct, warehouseId }) => {
    const store = useSelector((state: IState) => state.store.data);

    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([]);

    const inputRef = useRef<any>();

    const focusInput = useCallback((e: any) => {
        if (e.code === 'F2' && inputRef.current) {
            return inputRef.current.focus();
        }
        return null;
    }, []);

    const onChange = debounce((text_string?: string) => {
        setProducts([]);
        setLoading(true);

        if (store._id) {
            productApi
                .getProducts({
                    storeId: store._id,
                    page: 1,
                    limit: 20,
                    search: text_string,
                    withQuantity: true,
                    variant: true,
                    warehouseId,
                })
                .then((response: any) => {
                    setProducts(response.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, 300);

    const handleSelectProduct = (product: IProductState) => {
        selectProduct(product);
    };

    useEffect(() => {
        document.addEventListener('keydown', focusInput);

        return () => {
            document.removeEventListener('keydown', focusInput);
        };
    }, [focusInput]);

    return (
        <ProviderContext selectProduct={handleSelectProduct}>
            <SearchDropdown className="search-product" input={<InputSearch onChange={onChange} />}>
                <ProductsDropdown products={products} loading={loading} />
            </SearchDropdown>
        </ProviderContext>
    );
};

export default SearchProduct;
