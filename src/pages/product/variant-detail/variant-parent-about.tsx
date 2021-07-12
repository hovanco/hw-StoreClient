import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Card, Space, Avatar, Row, Col } from 'antd';
import imgPlaceholder from '../../../assets/images/img-placeholder.svg';
import { InsaButton } from '../../../components';
import { useVariant } from './context';
import { IProductVariantDetailParams } from '../interface';
import { IProduct } from '../../../models';
import constants from '../../../constants';

type Props = {
    product: IProduct;
};

const VariantParentAbout: FC<Props> = ({ product }) => {
    const history = useHistory();
    const params = useParams<IProductVariantDetailParams>();
    const { addNewVariant: addNewVariantContext } = useVariant();

    const addNewVariant = () => {
        history.push(`/products/detail/${product._id}/variant/new`);
        addNewVariantContext();
    };

    return (
        <Card title="Sản phẩm" className="variant-parent-about">
            <Row gutter={14}>
                <Col>
                    <Avatar
                        src={
                            product?.images?.length
                                ? `${constants.URL_IMG}${product.images[0]}`
                                : imgPlaceholder
                        }
                        shape={'square'}
                        size={56}
                    />
                </Col>
                <Col flex={1}>
                    <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-variants-length">
                            {product?.variants?.length || 0} phiên bản
                        </div>
                    </div>
                    {params.variantId !== 'new' ? (
                        <Space direction="vertical" align="end" style={{ width: '100%' }}>
                            <InsaButton key="add-variant" onClick={addNewVariant}>
                                Thêm phiên bản
                            </InsaButton>
                        </Space>
                    ) : (
                        <></>
                    )}
                </Col>
            </Row>
        </Card>
    );
};

export default VariantParentAbout;
