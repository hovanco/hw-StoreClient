import { Card, Checkbox, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC, useEffect, useState } from 'react';
import { IStock } from '../../../../models';
import { ProductContextProvider } from '../../context/context';
import SelectAttributes from './select-attributes';
import TableProductVariant from './table-product-variant';
import TableQuantityProduct from './table-quantity-product';
import UpdateQuantityProduct from './update-quantity-product';

interface Props {
    form: FormInstance;
    quantity?: any[];
    setQuantity: (value: any[]) => void;
    isEdit?: boolean;
}

const ProductFormProperties: FC<Props> = ({ form, quantity, setQuantity, isEdit = true }) => {
    const [quantityLocal, setQuantityLocal] = useState<any[]>([]);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (quantity) {
            setQuantityLocal(quantity);
        }
    }, [quantity]);

    useEffect(() => {
        if (form.getFieldValue('attributes')?.length || form.getFieldValue('variants')?.length) {
            setChecked(true);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!checked) {
            form.setFieldsValue({ 'attributes': undefined });
        }
    }, [form, checked]);

    const onCheckboxChange = (e: any) => {
        setChecked(e.target.checked);
    };

    const changeStockUpdate = (value: any) => {
        const newValue = quantityLocal.map((i: IStock) => {
            if (i.warehouseId === value.warehouseId) {
                return { ...i, quantity: value.quantity };
            }

            return i;
        });

        setQuantityLocal(newValue);
        // setQuantity(newValue);

        form.setFieldsValue({
            stocks: newValue,
        });
    };

    return (
        <>
            {!checked && (
                <Card
                    title="Số lượng"
                    size="small"
                    bodyStyle={{ padding: 0 }}
                    extra={!isEdit ? <UpdateQuantityProduct quantity={quantity || []} /> : null}
                >
                    <TableQuantityProduct
                        quantity={quantity || []}
                        isEdit={isEdit}
                        changeStockUpdate={changeStockUpdate}
                    />
                </Card>
            )}

            <Card title="Thuộc tính" size="small">
                <Form.Item noStyle>
                    <Checkbox onChange={onCheckboxChange} indeterminate={checked}>
                        <b>Sản phẩm có nhiều phiên bản</b>
                    </Checkbox>
                </Form.Item>

                {checked && (
                    <ProductContextProvider isCreateMode form={form}>
                        <SelectAttributes />
                        <TableProductVariant />
                    </ProductContextProvider>
                )}
            </Card>
        </>
    );
};

export default ProductFormProperties;
