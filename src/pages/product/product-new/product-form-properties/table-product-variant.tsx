import React, { FC, useState, useCallback } from 'react';
import { ColumnType } from 'antd/lib/table';
import { debounce } from 'lodash';
import { IAttribute, IStock, IVariant } from '../../../../models';
import formatMoney, { formatterInput, parserInput } from '../../../../helper/format-money';

import { Input, Form, Typography, InputNumber } from 'antd';
import { InsaTable } from '../../../../components';
import ModalUpdateVariantQuantity from './modal-update-variant-quantity/index';
import useVariants from '../../context/use-variant';
import useStocks from '../../context/use-stock';

import './table-product-variant.less';

interface Props {}

const TableProductVariant: FC<Props> = () => {
    const { variants, setVariants } = useVariants();
    const { stocks } = useStocks();
    const [visible, setVisible] = useState<boolean>(false);

    const toggleModal = () => setVisible(!visible);

    const columns: ColumnType<any>[] = [
        {
            title: 'Thuộc tính sản phẩm',
            align: 'center',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: IVariant) => (
                <div>
                    <div>{record.name}</div>
                    <div className="blue-text">
                        {record.attributes.map((item: IAttribute) => item.tags).join(' - ')}
                    </div>
                </div>
            ),
        },
        {
            title: 'Mã SKU',
            align: 'center',
            dataIndex: 'sku',
            key: 'sku',
            render: (text: string, record: IVariant) => (
                <Input
                    defaultValue={text}
                    onChange={(e) => updateDataSource(record._id, { sku: e.target.value })}
                />
            ),
        },
        {
            title: 'Mã Barcode',
            align: 'center',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: IVariant) => (
                <Input
                    defaultValue={text}
                    onChange={(e) => updateDataSource(record._id, { code: e.target.value })}
                />
            ),
        },
        {
            title: 'Tổng số lượng',
            align: 'center',
            dataIndex: 'length',
            key: 'length',
            width: 140,
            render: (text: string, record: any) => (
                <Typography.Link onClick={toggleModal} underline>
                    Khả dụng: {formatMoney(getVariantQuantity(record._id))}
                </Typography.Link>
            ),
        },
        {
            title: 'Giá bán',
            align: 'center',
            dataIndex: 'price',
            key: 'price',
            render: (text: string, record: any) => (
                <InputNumber
                    defaultValue={Number(text)}
                    formatter={formatterInput}
                    parser={parserInput}
                    onChange={(value) =>
                        updateDataSource(record._id, {
                            price: Number(value),
                            wholesalePrice: Number(value),
                        })
                    }
                />
            ),
        },
    ];

    const updateDataSource = debounce((rowId: string, newProperty: any) => {
        const newDataSource = variants.map((row: IVariant) => {
            if (row._id === rowId) return { ...row, ...newProperty };

            return row;
        });

        setVariants(newDataSource);
    }, 750);

    const getVariantQuantity = useCallback(
        (variantId: string) => {
            let targetStocks = stocks.filter((item: IStock) => item.productId._id === variantId);

            return targetStocks.reduce(
                (prevValue: number, currValue: IStock) => prevValue + currValue.quantity,
                0
            );
        },
        [stocks]
    );

    return (
        <Form.Item name="variants" noStyle>
            {variants.length > 0 ? (
                <InsaTable
                    rowKey="_id"
                    columns={columns}
                    dataSource={variants}
                    bordered
                    className="order-tbl table-product-variant"
                    pagination={false}
                    title={undefined}
                    footer={undefined}
                />
            ) : (
                <></>
            )}

            <ModalUpdateVariantQuantity visible={visible} toggle={toggleModal} />
        </Form.Item>
    );
};

export default TableProductVariant;
