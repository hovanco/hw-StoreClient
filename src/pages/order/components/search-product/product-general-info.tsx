import { PictureOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import { get } from 'lodash';
import React, { FC } from 'react';
import constants from '../../../../constants';
import { IAttribute } from '../../../../models/store';
import { IProduct } from '../../../../models';
import formatMoney from '../../../../helper/format-money';
import NoProduct from './no-product';

interface Props {
    product: IProduct;
}

const ProductGeneralInfo: FC<Props> = ({ product }) => {
    if (!product)
        return (
            <Card className="product-general-info">
                <NoProduct />
            </Card>
        );

    const categoryName = get(product, 'categoryId.name') || '---';

    return (
        <Card className="product-general-info">
            <Typography.Title level={3}>
                #{product.name}{' '}
                {product.attributes?.map((attr: IAttribute) => attr.tags)?.join(' - ')}
            </Typography.Title>
            <div className="general-info">
                <div className="tab-label">Thông tin sản phẩm</div>

                <Row gutter={32}>
                    <Col>
                        <Avatar
                            size={80}
                            src={
                                product.images && product.images?.length
                                    ? `${constants.URL_IMG}${product.images[0]}`
                                    : undefined
                            }
                            shape="square"
                            icon={<PictureOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Row gutter={[12, 12]}>
                            <Col span={12}>Giá</Col>
                            <Col span={12}>
                                : {product.price ? formatMoney(product.price) : 0} đ
                            </Col>
                            <Col span={12}>Mã SKU</Col>
                            <Col span={12}>: {product.sku}</Col>
                            <Col span={12}>Barcode</Col>
                            <Col span={12}>: {product.code}</Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Row gutter={[12, 12]}>
                            <Col span={12}>Nhãn hiệu</Col>
                            <Col span={12}>: ---</Col>
                            <Col span={12}>Danh mục</Col>
                            <Col span={12}>: {categoryName}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="description">
                <div className="tab-label">Mô tả sản phẩm</div>
                <div className="description-content">{product.shortDescription}</div>
            </div>
        </Card>
    );
};

export default ProductGeneralInfo;
