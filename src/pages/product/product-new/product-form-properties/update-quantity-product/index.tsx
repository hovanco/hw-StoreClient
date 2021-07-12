import { Button, message, Modal } from 'antd';
import { findIndex } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { createStock, updateStock } from '../../../../../api/stock-api';
import { IProduct } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useProductDetail } from '../../../product-detail/state/context';
import TableQuantityProduct from '../table-quantity-product';

interface Props {
    quantity: any[];
}
export interface IStockUpdate {
    _id?: string;
    productId?: string;
    quantity: number;
    storeId: string;
    warehouseId: string;
}

const UpdateQuantityProduct: FC<Props> = ({ quantity }) => {
    const { loadProduct, product } = useProductDetail();
    const [loading, setLoading] = useState<boolean>(false);
    const store = useSelector((state: IState) => state.store.data);
    const [visible, setVisible] = useState<boolean>(false);
    const [stocksUpdate, setStocksUpdate] = useState<IStockUpdate[]>([]);
    const toggle = () => setVisible(!visible);

    const changeStockUpdate = (stock: IStockUpdate) => {
        const index = findIndex(stocksUpdate, (item) => item.warehouseId === stock.warehouseId);

        if (index === -1) {
            return setStocksUpdate([...stocksUpdate, stock]);
        }

        const newStockUpdate = stocksUpdate.map((item, key) => {
            if (key === index) {
                return stock;
            }

            return item;
        });

        return setStocksUpdate(newStockUpdate);
    };

    const handleOke = async () => {
        if (stocksUpdate.length > 0) {
            setLoading(true);
            try {
                await Promise.all(
                    stocksUpdate.map((stock: IStockUpdate) => {
                        let { quantity, _id } = stock;

                        if (!_id) {
                            return createStock({
                                storeId: store._id as string,
                                productId: stock.productId as string,
                                warehouseId: stock.warehouseId,
                                quantity,
                            });
                        }

                        return updateStock({
                            storeId: store._id as string,
                            quantity,
                            stockId: _id,
                        });
                    })
                );
                message.success('Cập nhật số lượng thành công');
                toggle();

                loadProduct({
                    storeId: store._id,
                    productId: (product as IProduct)._id,
                });
            } catch (error) {
                message.error('Lỗi cập nhật số lượng');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Button type="primary" onClick={toggle}>
                Cập nhật số lượng
            </Button>
            <Modal
                visible={visible}
                onCancel={toggle}
                title="Cập nhật số lượng"
                width={768}
                bodyStyle={{ padding: 0 }}
                onOk={handleOke}
                okButtonProps={{
                    loading,
                }}
            >
                <TableQuantityProduct
                    quantity={quantity}
                    isEdit
                    changeStockUpdate={changeStockUpdate}
                />
            </Modal>
        </>
    );
};

export default UpdateQuantityProduct;
