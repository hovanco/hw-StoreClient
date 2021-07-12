import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { pick, flatten, get, isNil } from 'lodash';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import formatMoney from '../../../../../helper/format-money';
import { IOrder } from '../../../../../models';
import DeliveryFooter from '../delivery-footer';
import './product-table.less';

interface Props {
    order: IOrder;
}

const ProductTable: FC<Props> = ({ order }) => {
    const columns: ColumnsType<any> = [
        {
            title: 'Mã sản phẩm',
            align: 'center',
            key: 'code',
            render: ({ _id, code, parentId = undefined }) => { return isNil(parentId) ? 
            <Link to={`/products/detail/${_id}`} target="_blank">{code || '---'}</Link> 
            :
            <Link to={`/products/detail/${parentId}/variant/${_id}`} target="_blank">{code || '---'}</Link> },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: '',
            key: 'name',
            align: 'center',
            render: (product) => {
                const version = flatten(
                    (get(product, 'attributes') || []).map((item: any) => item.tags)
                ).join(' - ');
                return (
                    <div>
                        <div>{product.name}</div>
                        <small>{version}</small>
                    </div>
                );
            },
        },
        {
            title: 'Đơn giá',
            align: 'center',
            dataIndex: 'price',
            render: (price: number) => <span>{formatMoney(price)}</span>,
        },
        {
            title: 'Số lượng',
            align: 'center',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Thành tiền',
            dataIndex: '',
            key: 'totalPrice',
            align: 'center',
            render: ({ price, count }) => <span>{formatMoney(price * count)}</span>,
        },
    ];

    const dataSourceProducts = order.products.map((product: any) => ({
        ...product.productId,
        ...pick(product, ['count', 'price']),
    }));

    return (
        <Table
            className="order-product-table"
            columns={columns}
            bordered
            dataSource={dataSourceProducts}
            rowKey={(record) => record._id}
            pagination={false}
            footer={() => <DeliveryFooter order={order} />}
        />
    );
};

export default ProductTable;
