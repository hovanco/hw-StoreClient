import React, { FC, memo } from 'react';
import { Space, Row, Col, Button } from 'antd';
import iconShopee from '../../../assets/images/shopee@2x.png';
import iconLazada from '../../../assets/images/lazada@2x.png';
import iconTiki from '../../../assets/images/tiki@2x.png';
import iconInsa from '../../../assets/images/apple-touch-icon@2x.png';
import { TextEllipsis } from '../../../components';
import { IProduct } from '../../../models';
import ImgPlaceholder from './img-placeholder';
import constants from '../../../constants';

import './index.less';

interface IProps {
    text: string;
    onClick: () => void;
    product: IProduct;
}

const ProductColumnName: FC<IProps> = ({ text, onClick, product }) => (
    <Space className="product-tbl__col-name">
        {product?.images?.length ? (
            <img
                style={{ width: 50, height: 40, objectFit: 'contain' }}
                src={`${constants.URL_IMG}${product.images[0]}`}
                alt="product"
            />
        ) : (
            <ImgPlaceholder />
        )}

        <Row justify="center">
            <Col span={24} style={{ textAlign: 'center' }}>
                <Button
                    className="product-tbl__name"
                    onClick={onClick}
                    type="link"
                    style={{ padding: 0, height: 'initial' }}
                >
                    <TextEllipsis width={250}>{text}</TextEllipsis>
                </Button>
            </Col>
            {/* <Col className="product-tbl__social" span={24} style={{ textAlign: 'center' }}>
                <Space>
                    <img src={iconShopee} alt="insa" />
                    <img src={iconLazada} alt="insa" />
                    <img src={iconTiki} alt="insa" />
                    <img src={iconInsa} alt="insa" />
                </Space>
            </Col> */}
        </Row>
    </Space>
);

export default memo(ProductColumnName);
