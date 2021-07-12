import { Empty } from 'antd';
import React, { FC } from 'react';
import { Loading } from '../../../../components';
import { IProduct } from '../../../../models';
import { IProductState } from '../../create/state/interface';
import { useSearchProduct } from './context';
import ProductRow from './product-row';

const NoProduct: FC = () => {
    return (
        <div className="no-products">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có sản phẩm" />
        </div>
    );
};

interface Props {
    loading: boolean;
    products: IProduct[];
    setHideVisible?: () => void;
}

const ProductsDropdown: FC<Props> = ({ products, loading, setHideVisible }) => {
    const { selectProduct } = useSearchProduct();

    const handleAddProduct = (product: IProductState) => {
        selectProduct(product);
        if (setHideVisible) setHideVisible();
    };

    const renderProducts = () => {
        if (loading) return null;
        if (products.length === 0) return <NoProduct />;
        return products.map((product) => (
            <ProductRow key={product._id} product={product} selectProduct={handleAddProduct} />
        ));
    };

    return (
        <div className="products-dropdown">
            {loading && <Loading />}

            {renderProducts()}
        </div>
    );
};

export default ProductsDropdown;
