import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { flatten, get } from 'lodash';
import React, { FC } from 'react';
import formatMoney from '../../../../helper/format-money';
import { useOrderNew } from '../../create/state/context';
import { EStatusPage, IProductState } from '../../create/state/interface';
import ChangeCount from './change-count';
import ProductRemoveBtn from './product-remove-btn';
import './product-table.less';

interface Props {
    products: IProductState[];
}

const columns_base: ColumnsType<IProductState> = [
    {
        title: 'Mã SP',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: 100,
        render: (code: string) => code || '---',
    },

    {
        title: 'Tên sản phẩm',
        dataIndex: '',
        align: 'center',
        key: 'product',
        render: (product) => {
            const version = flatten(
                (get(product, 'attributes') || []).map((item: any) => item.tags)
            ).join(' - ');
            return (
                <>
                    <div>{product.name}</div>
                    {version.length > 0 && <small>{version}</small>}
                </>
            );
        },
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        align: 'center',
        key: 'price',
        render: (price) => formatMoney(price),
    },

    {
        title: 'Số lượng',
        dataIndex: '',
        key: 'count',
        align: 'center',
        width: 150,
        render: (product) => {
            return <ChangeCount product={product} />;
        },
    },
    {
        title: 'Thành tiền',
        dataIndex: '',
        key: 'totalMoney',
        align: 'center',
        render: ({ count, price }) => {
            return formatMoney(count * price);
        },
    },
];

const ProductOrder: FC<Props> = ({ products }) => {
    const { statusPage } = useOrderNew();

    const columns: ColumnsType<IProductState> =
        statusPage === EStatusPage.DETAIL
            ? columns_base
            : [
                  ...columns_base,
                  {
                      title: '',
                      dataIndex: '',
                      key: 'remove',
                      width: 60,
                      render: (product) => {
                          return <ProductRemoveBtn product={product} />;
                      },
                  },
              ];

    return (
        <Table
            sticky
            dataSource={products}
            columns={columns}
            rowKey={(item: IProductState) => item._id as string}
            pagination={false}
            bordered
            scroll={{
                y: 350,
            }}
            className="order-product-table"
        />
    );
};

export default ProductOrder;
