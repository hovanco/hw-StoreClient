import React, { FC } from 'react';
import { IProduct, IVariant } from '../../../models';
import { useParams } from 'react-router-dom';

import { Card, Avatar, Row, Col } from 'antd';
import imgPlaceholder from '../../../assets/images/img-placeholder.svg';
import formatMoney from '../../../helper/format-money';
import { IProductVariantDetailParams } from '../interface';
import constants from '../../../constants';

type Props = {
    product: IProduct;
    onChangeSelectedVariant: Function;
};

const VariantList: FC<Props> = ({ product, onChangeSelectedVariant }) => {
    const params = useParams<IProductVariantDetailParams>();

    return (
        <Card title="Danh sách phiên bản" className="card-variant-list">
            {product.variants && product.variants.length ? (
                <div className="variant-list">
                    {product.variants.map((variant: IVariant) => (
                        <div
                            className={`variant-list-item${
                                params.variantId === variant._id ? ' active' : ''
                            }`}
                            key={variant._id}
                            onClick={() => onChangeSelectedVariant(variant)}
                        >
                            <Row gutter={12}>
                                <Col>
                                    <Avatar
                                        src={
                                            variant.images && variant.images.length
                                                ? `${constants.URL_IMG}${variant.images[0]}`
                                                : imgPlaceholder
                                        }
                                        shape={'square'}
                                        size={40}
                                    />
                                </Col>
                                <Col flex={1}>
                                    <div>
                                        <div>
                                            {variant.attributes
                                                .map((item: any) => item.tags)
                                                .join('-')}
                                        </div>
                                        {variant.sku ? <div>SKU: {variant.sku}</div> : <></>}
                                    </div>
                                </Col>
                                <Col>{formatMoney(variant.price?.toString() || '0')} đ</Col>
                            </Row>
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </Card>
    );
};

export default VariantList;
