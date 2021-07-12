import { CaretDownOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Menu, message, Row, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ColumnType } from 'antd/lib/table';
import { find, pick } from 'lodash';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import productApi from '../../../../api/product-api';
import { createStock, updateStock } from '../../../../api/stock-api';
import imgPlaceholder from '../../../../assets/images/img-placeholder.svg';
import { InsaButton, InsaTable } from '../../../../components';
import constants from '../../../../constants';
import formatMoney from '../../../../helper/format-money';
import { IAttribute, IStock, IVariant } from '../../../../models';
import { storeAction } from '../../../../reducers/storeState/action';
import { IState } from '../../../../store/rootReducer';
import useAttributes from '../../context/use-attribute';
import useStocks from '../../context/use-stock';
import useVariants from '../../context/use-variant';
import { IProductDetailParams } from '../../interface';
import ProductFormProperties from '../../product-new/product-form-properties';
import ModalUpdateVariantQuantity from '../../product-new/product-form-properties/modal-update-variant-quantity';
import EditAttributes from './edit-attributes';
import EditInput from './edit-input';
import './index.less';
import SortAttributes from './sort-attributes';

interface Props {
    form: FormInstance;
}

const ProductVariant: FC<Props> = ({ form }) => {
    const [selected, setSelected] = useState<IVariant>();
    const [loading, setLoading] = useState<boolean>(false);
    const [visibleModalStock, setVisibleModalStock] = useState<boolean>(false);

    const params = useParams<IProductDetailParams>();
    const history = useHistory();
    const path = useRouteMatch();
    const dispatch = useDispatch();
    const { attributes, setAttributes } = useAttributes();
    const { variants, setVariants } = useVariants();
    const { setStocks } = useStocks();

    const storeObj = useSelector((state: IState) => state.store.data);
    const stocks = useSelector((state: IState) => state.store.stocks);

    const toggleModal = useCallback(() => {
        setVisibleModalStock(!visibleModalStock);
    }, [visibleModalStock]);

    useEffect(() => {
        setVariants(form.getFieldValue('variants'));
        setAttributes(form.getFieldValue('attributes'));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setStocks(stocks.data);
        // eslint-disable-next-line
    }, [stocks]);

    const columns: ColumnType<any>[] = [
        {
            title: 'SKU',
            align: 'center',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Tên phiên bản',
            align: 'center',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: IVariant) => (
                <Row gutter={5}>
                    <Col>
                        <Avatar
                            src={
                                record?.images?.length
                                    ? `${constants.URL_IMG}${record.images[0]}`
                                    : imgPlaceholder
                            }
                            shape={'square'}
                            size={40}
                        />
                    </Col>
                    <Col
                        onClick={() => history.push(`${path.url}/variant/${record._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div>{record.name}</div>
                        <div className="primary-text">
                            {record.attributes.map((attr: IAttribute) => attr.tags).join('-')}
                        </div>
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Tổng số lượng',
            align: 'center',
            render: (text: string, record: IVariant) => (
                <Typography.Link onClick={toggleModal} underline>
                    Khả dụng: {formatMoney(getVariantQuantity(record._id))}
                </Typography.Link>
            ),
        },
        {
            title: 'Đã bán',
            align: 'center',
            render: (text: string, record: IVariant) => (
                <EditInput
                    defaultValue={0}
                    isNumber
                    isEdit={selected?._id === record._id}
                    onChange={(value: string | number) => {
                        setSelected({
                            ...selected,
                            length: Number(value),
                        } as IVariant);
                    }}
                    disabled={loading}
                />
            ),
        },
        {
            title: 'Giá lẻ',
            align: 'center',
            dataIndex: 'price',
            key: 'price',
            render: (text: string, record: IVariant) => (
                <EditInput
                    defaultValue={text}
                    isNumber
                    isEdit={selected?._id === record._id}
                    onChange={(value: string | number) => {
                        setSelected({
                            ...selected,
                            price: Number(value),
                        } as IVariant);
                    }}
                    disabled={loading}
                />
            ),
        },
        {
            title: 'Giá sỉ',
            align: 'center',
            dataIndex: 'wholesalePrice',
            key: 'wholesalePrice',
            render: (text: string, record: IVariant) => (
                <EditInput
                    defaultValue={text}
                    isNumber
                    isEdit={selected?._id === record._id}
                    onChange={(value: string | number) => {
                        setSelected({
                            ...selected,
                            wholesalePrice: Number(value),
                        } as IVariant);
                    }}
                    disabled={loading}
                />
            ),
        },
        {
            title: '',
            align: 'center',
            dataIndex: 'price',
            key: 'price',
            render: (text: string, record: IVariant) =>
                selected?._id === record._id ? (
                    <InsaButton
                        style={{ width: 60 }}
                        type="primary"
                        onClick={saveSelected}
                        disabled={loading}
                    >
                        Lưu
                    </InsaButton>
                ) : (
                    <InsaButton
                        style={{ width: 60 }}
                        onClick={() => setSelected(record)}
                        disabled={loading}
                    >
                        Sửa
                    </InsaButton>
                ),
        },
    ];

    const saveSelected = () => {
        setLoading(true);

        productApi
            .editVariant(
                storeObj._id as string,
                params.productId as string,
                selected?._id as string,
                {
                    ...pick(selected, [
                        'attributes',
                        'code',
                        'images',
                        'price',
                        'sku',
                        'wholesalePrice',
                    ]),
                    code: selected?.code as string,
                }
            )
            .then((response: IVariant) => {
                let newVariants = variants.map((variant: IVariant) => {
                    if (variant._id === response._id) return response;

                    return variant;
                });

                setVariants(newVariants);
                setSelected(undefined);
                message.success('Cập nhật sản phẩm thành công');
            })
            .catch((error) => {
                message.error('Cập nhật sản phẩm thất bại');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleUpdateStocks = async (stockData: IStock[]) => {
        try {
            if (!stockData.length) return;

            setLoading(true);

            let updatedStocks = stockData.filter((item: IStock) => {
                if (item._id === item.productId._id && item.quantity !== 0) return true;

                if (find(stocks.data, ['_id', item._id])?.quantity !== item.quantity) return true;

                return false;
            });

            if (!updatedStocks.length) {
                setVisibleModalStock(false);
                return;
            }

            await Promise.all(
                updatedStocks.map((item: IStock) => {
                    if (item._id === item.productId._id)
                        return createStock({
                            storeId: storeObj._id as string,
                            productId: item.productId._id as string,
                            warehouseId: item.warehouseId,
                            quantity: item.quantity,
                        });

                    return updateStock({
                        storeId: storeObj._id as string,
                        stockId: item._id,
                        quantity: item.quantity,
                    });
                })
            );

            message.success('Cập nhật số lượng tồn kho của sản phẩm thành công');

            toggleModal();

            dispatch(
                storeAction.getStocks({
                    storeId: storeObj._id as string,
                    parentId: params?.productId as string,
                })
            );
        } catch {
            message.error('Cập nhật số lượng tồn kho của sản phẩm thất bại');
        } finally {
            setLoading(false);
        }
    };

    const DropDownMenu = () => (
        <Menu>
            <Menu.Item key="1">
                <EditAttributes form={form} />
            </Menu.Item>
            {attributes && attributes.length > 0 && (
                <Menu.Item key="2">
                    <SortAttributes form={form} />
                </Menu.Item>
            )}
        </Menu>
    );

    const getVariantQuantity = useCallback(
        (variantId: string) => {
            let targetStocks = stocks.data.filter(
                (item: IStock) => item.productId._id === variantId
            );

            return targetStocks.reduce(
                (prevValue: number, currValue: IStock) => prevValue + currValue.quantity,
                0
            );
        },
        [stocks]
    );

    if (!variants || variants.length === 0) {
        return (
            <ProductFormProperties
                form={form}
                setQuantity={setStocks}
                quantity={stocks.data}
                isEdit={false}
            />
        );
    }

    return (
        <Card title="Phiên bản sản phẩm" className="product-variant">
            <InsaTable
                rowKey="_id"
                columns={columns}
                dataSource={variants}
                bordered
                className="order-tbl table-product-variant"
                pagination={false}
                footer={undefined}
                headerExtend={
                    <div className="custom-table-header">
                        <InsaButton
                            size="middle"
                            onClick={() => history.push(`${params.productId}/variant/new`)}
                        >
                            Thêm phiên bản
                        </InsaButton>

                        <Dropdown overlay={DropDownMenu} trigger={['click']}>
                            <InsaButton size="middle">
                                Tuỳ chỉnh <CaretDownOutlined />
                            </InsaButton>
                        </Dropdown>
                    </div>
                }
            />

            <ModalUpdateVariantQuantity
                loading={loading}
                visible={visibleModalStock}
                toggle={toggleModal}
                onUpdate={handleUpdateStocks}
            />
        </Card>
    );
};

export default ProductVariant;
