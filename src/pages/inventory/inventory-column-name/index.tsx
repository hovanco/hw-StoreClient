import { Space, Typography } from 'antd';
import React, { FC, memo } from 'react';
import { InsaButton } from '../../../components';
import constants from '../../../constants';
import { IAttribute, IStock } from '../../../models';
import ImgPlaceholder from '../../product/product-column-name/img-placeholder';

interface IProps {
    stock: IStock;
}
const InventoryColumnName: FC<IProps> = ({ stock }) => (
    <Space className="product-tbl__col-name">
        {stock?.productId.images?.length ? (
            <img
                style={{ width: 50, height: 40, objectFit: 'contain' }}
                src={`${constants.URL_IMG}${stock?.productId.images[0]}`}
                alt="product"
            />
        ) : (
            <ImgPlaceholder />
        )}

        <div>
            <InsaButton
                className="product-tbl__name"
                type="link"
                style={{ display: 'block', padding: 0, height: 'initial' }}
            >
                {stock.productId.name}
            </InsaButton>
            <Typography.Text>
                {stock.productId.name}{' '}
                {stock.productId.attributes?.map((item: IAttribute) => item.tags[0]).join(' - ')}
            </Typography.Text>
        </div>
    </Space>
);

export default memo(InventoryColumnName);
