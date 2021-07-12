import { Col, Form, InputNumber, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { get } from 'lodash';
import React from 'react';
import formatMoney, { formatterInput, parserInput } from '../../../../../helper/format-money';
import { EDeliveryDiscountBy } from '../../../../../models/order';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';
import { getValueDiscount, getMoneyProduct } from '../../ultil';

interface IDiscountItem {
    label: string;
    value: EDeliveryDiscountBy;
}

const discountTypes: IDiscountItem[] = [
    {
        label: 'VND',
        value: EDeliveryDiscountBy.Money,
    },
    {
        label: '%',
        value: EDeliveryDiscountBy.Percent,
    },
];

const Discount = () => {
    const { statusPage, changeValueField, discountBy, discount, order, products } = useOrderNew();

    const maxDiscountMoney = getMoneyProduct(products);
    const isDiscountByMoney = discountBy === EDeliveryDiscountBy.Money;

    if (statusPage === EStatusPage.DETAIL) {
        if (discountBy === EDeliveryDiscountBy.Money)
            return <span>{`${formatMoney(discount || 0)} đ`}</span>;

        const orderProducts = get(order, 'products') || [];

        const products = orderProducts.map((product: any) => ({
            ...product,
            ...product.productId,
        }));

        const value_discount = getValueDiscount({
            products,
            discount,
            discountBy,
        });

        return <span>{`${formatMoney(value_discount)} đ`}</span>;
    }

    const onChangeDiscountType = (e: RadioChangeEvent) => {

        const value = e.target.value;
        changeValueField({
            field: 'discountBy',
            value,
        });

        if (discount && discount > 100 && value === EDeliveryDiscountBy.Percent) {
            changeValueField({
                field: 'discount',
                value: 100,
            });
        }
    };

    const changeDiscountValue = (value?: string | number) => {
        changeValueField({
            field: 'discount',
            value: Number(value),
        });
    };

    return (
        <>
            <Col>
                <Form.Item>
                    <Radio.Group
                        value={discountBy}
                        onChange={onChangeDiscountType}
                        options={discountTypes}
                        optionType="button"
                        className="discountType"
                    />
                </Form.Item>
            </Col>

            <Col
                style={{
                    flex: 1,
                }}
            >
                <Form.Item>
                    <InputNumber
                        placeholder="Nhập giá trị chiết khấu"
                        onChange={changeDiscountValue}
                        style={{
                            width: '100%',
                        }}
                        value={discount}
                        formatter={formatterInput}
                        parser={parserInput}
                        min={0}
                        max={isDiscountByMoney ? maxDiscountMoney : 100}
                    />
                </Form.Item>
            </Col>
        </>
    );
};

export default Discount;
