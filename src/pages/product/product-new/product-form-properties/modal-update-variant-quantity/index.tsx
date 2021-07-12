import React, { FC, useState, useMemo, useCallback } from 'react';

import { find } from 'lodash';

import { Modal, Divider, Space } from 'antd';
import { InsaButton, Loading } from '../../../../../components';
import { IVariant, IStock } from '../../../../../models';

import useVariants from '../../../context/use-variant';
import useStocks from '../../../context/use-stock';

import './index.less';

const TableUpdateVariantQuantity = React.lazy(() => import('./table'));

interface Props {
    visible: boolean;
    toggle: () => void;
    onUpdate?: Function;
    loading?: boolean;
}

const ModalUpdateVariantQuantity: FC<Props> = ({ visible, toggle, onUpdate, loading = false }) => {
    const { variants } = useVariants();
    const { stocks, setStocks } = useStocks();

    const [localStocks, setLocalStocks] = useState<any>([]);

    const handleUpdateToContext = useCallback(() => {
        let newStocks: IStock[] = [];

        localStocks.forEach((item: any) => {
            let { _id, productId, ...rest } = item;

            let localStockArr = Object.entries({ ...rest }).map(([warehouseId, quantity]) => {
                let stock = find(
                    stocks,
                    (o) => o.productId._id === _id && o.warehouseId === warehouseId
                );

                if (!stock) return { _id, warehouseId, productId, quantity };

                return { ...stock, quantity };
            });

            newStocks = newStocks.concat(localStockArr as IStock[]);
        });

        setStocks(newStocks);

        if (onUpdate) onUpdate(newStocks);
        else toggle();
        // eslint-disable-next-line
    }, [stocks, localStocks]);

    const stockPipeToDataTable = useMemo(() => {
        if (!variants) return [];

        let newLocalStocks = variants.map((variant: IVariant) => {
            let localStock = {
                _id: variant._id,
                productId: variant,
            };

            if (stocks.length) {
                let stockFilteredByProductId = stocks.filter(
                    (item: IStock) => item.productId._id === variant._id
                );

                localStock = stockFilteredByProductId.reduce(
                    (prevValue, currValue: IStock) => ({
                        ...prevValue,
                        [currValue.warehouseId]: currValue.quantity,
                    }),
                    localStock
                );
            }

            return localStock;
        });

        return newLocalStocks;
    }, [variants, stocks]);

    useMemo(() => {
        setLocalStocks(stockPipeToDataTable);
        // eslint-disable-next-line
    }, [stocks, variants]);

    const handleCancel = () => {
        setLocalStocks(stockPipeToDataTable);
        toggle();
    };

    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            title="Thay đổi số lượng biến thể"
            closable={false}
            footer={null}
            width={800}
            wrapClassName="modal-change-variant-quantity"
        >
            {loading && <Loading full />}

            <React.Suspense fallback={<Loading full />}>
                <TableUpdateVariantQuantity
                    localStocks={localStocks}
                    setLocalStocks={setLocalStocks}
                />
            </React.Suspense>

            <div className="footer">
                <Divider />

                <Space className="footer-btn">
                    <InsaButton
                        onClick={handleCancel}
                        size="middle"
                        loading={loading}
                        style={{ width: 120 }}
                    >
                        Huỷ
                    </InsaButton>
                    <InsaButton
                        onClick={handleUpdateToContext}
                        loading={loading}
                        size="middle"
                        type="primary"
                        style={{ width: 120 }}
                    >
                        Cập nhật
                    </InsaButton>
                </Space>
            </div>
        </Modal>
    );
};

export default ModalUpdateVariantQuantity;
