import { Col, Form, message, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { difference, every, get, isArray, isNil, map, omit, pick, set } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import productApi from '../../../api/product-api';
import { createStock } from '../../../api/stock-api';
import { uploadImagesRequest } from '../../../api/upload-api';
import { BackLink, InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { IProduct, IStock, IWarehouse } from '../../../models';
import { storeAction } from '../../../reducers/storeState/action';
import { IState } from '../../../store/rootReducer';
import theme from '../../../theme';
import { ProductFormDetail, ProductFormMedia } from '../components';
import ProductFormGeneral from './product-form-general';
import ProductFormProperties from './product-form-properties';
import { IStockUpdate } from './product-form-properties/update-quantity-product';
import ProductFormSaleInfo from '../components/product-form-sale-info';

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface Props {
    product?: IProduct;
};

const title = 'Thêm sản phẩm';
const requiredFields = ['name', 'sku', 'code', 'weight', 'originalPrice', 'wholesalePrice'];

const ProductForm: FC<Props> = ({ product }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = useForm();

    const storeObj = useSelector((state: IState) => state.store.data);
    const warehouses = useSelector((state: IState) => state.store.warehouses);
    const attributes = useSelector((state: IState) => state.store.attributes);
    const token = useSelector((state: IState) => state.auth.token);

    const [loading, setLoading] = useState<boolean>(false);
    const [filesImage, setFilesImage] = useState<any[]>([]);
    const [quantityWarehouse, setQuantityWarehouse] = useState<IStockUpdate[]>([]);
    const [disabled, setDisabled] = useState<boolean>(!product);

    useEffect(() => {
        if (storeObj._id) {
            dispatch(storeAction.getCategoriesByStore(storeObj._id));
            dispatch(storeAction.getAttributes(storeObj._id));
        }
        // eslint-disable-next-line
    }, [storeObj._id]);

    useEffect(() => {
        if (warehouses) {
            const formatWarehouses: IStockUpdate[] = warehouses.map((warehouse: IWarehouse) => ({
                storeId: warehouse.storeId as string,
                warehouseId: warehouse._id,
                quantity: 0,
                productId: get(product, '_id'),
            }));

            setQuantityWarehouse(formatWarehouses);
        }
        // eslint-disable-next-line
    }, [warehouses]);

    const createNewProduct = async (images: string[]) => {
        try {
            const formData = await form.validateFields();
            let formAttributes = form.getFieldValue('attributes');
            const variantsParam = formData.variants
                ? formData.variants.map((item: any) => ({
                    ...omit(item, ['name', 'length', 'width', 'height', 'weight', 'localId']),
                }))
                : undefined;

            if (formAttributes) {
                formAttributes = map(formAttributes, (item: any) =>
                    pick(item, ['_id', 'name', 'tags'])
                );

                if (isArray(variantsParam) && variantsParam.length === 0) {
                    return message.error('Bạn chưa nhập phiên bản cho sản phẩm!');
                }
                const newAttributes = difference(
                    formAttributes.map((i: any) => i._id),
                    attributes.data.map((i: any) => i._id)
                );

                if (newAttributes.length) {
                    await Promise.all(
                        newAttributes.map((attributeId: string) => {
                            let attributeItem = formAttributes.filter(
                                (item: any) => item._id === attributeId
                            )[0];
                            return productApi.createAttribute(
                                storeObj._id as string,
                                attributeItem
                            );
                        })
                    );
                }
            }

            set(formData, 'attributes', formAttributes);

            const product = await productApi.createProduct(storeObj._id as string, {
                ...formData,
                brandId: 'id__temp',
                unitId: 'id__temp',
                images,
                originalPrice: Number(formData['originalPrice']),
                wholesalePrice: Number(formData['wholesalePrice']),
                price: Number(formData['wholesalePrice']),
                variants: variantsParam,
            });

            let stocks = form.getFieldValue('stocks');

            if (stocks && stocks.length) {
                stocks = stocks.filter((item: IStock) => item.quantity);

                await Promise.all(
                    stocks.map((stock: IStock) => {
                        let { quantity, productId, warehouseId } = stock;

                        return createStock({
                            storeId: storeObj._id as string,
                            warehouseId,
                            quantity,
                            productId: productId
                                ? (productId._id as string)
                                : (product._id as string),
                        });
                    })
                );
            } else {
                stocks = quantityWarehouse.filter((item) => item.quantity);
                await Promise.all(
                    stocks.map((stock: IStock) => {
                        let { quantity, _id } = stock;
                        return createStock({
                            storeId: storeObj._id as string,
                            warehouseId: _id,
                            quantity,
                            productId: product._id as string,
                        });
                    })
                );
            }

            setFilesImage([]);
            setLoading(false);
            message.success('Thêm sản phẩm thành công!');
            history.push('/products/list');
        } catch (error) {
            if (get(error, 'response.status') === 409) {
                message.error('Mã barcode đã tồn tại, vui lòng thử lại!');
            } else {
                message.error('Đã có lỗi xảy ra, vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    const uploadImages = new Promise(async (resolve, reject) => {
        if (filesImage.length === 0) {
            resolve([]);
            return;
        }

        const accessToken = get(token, 'accessToken');
        const files = filesImage.map((i: any) => i.originFileObj);

        uploadImagesRequest({
            token: accessToken,
            storeId: storeObj._id as string,
            files,
        })
            .then((res) => resolve(res))
            .catch((error) => {
                resolve([]);
            });
    });

    const submit = () => {
        setLoading(true);
        if (storeObj._id) {
            uploadImages
                .then((response) => {
                    const images = (response as any[]).map((item: any) => item.key);
                    createNewProduct(images);
                })
                .catch((error) => {
                    createNewProduct([]);
                });
        } else {
            setLoading(false);
            message.error('Đã có lỗi xảy ra, vui lòng thử lại!');
        }
    };

    const renderGroupBtn = () => {
        return [
            <InsaButton
                style={{ width: 140 }}
                size="middle"
                key="cancel"
                disabled={loading}
                onClick={() => history.push('/products/list')}
            >
                Hủy
            </InsaButton>,
            <InsaButton
                size="middle"
                style={{ width: 140 }}
                type="primary"
                key="save"
                onClick={submit}
                loading={loading}
                disabled={disabled}
            >
                Lưu
            </InsaButton>,
            // TODO: Show after add feature
            // <InsaButton
            //     style={{ width: 140 }}
            //     size="middle"
            //     key="help"
            //     disabled={loading}
            //     icon={<QuestionCircleOutlined />}
            // >
            //     Trợ giúp
            // </InsaButton>,
        ];
    };

    const onFieldsChange = (changedFields: FieldData[], allFields: FieldData[]) => {
        const fields = allFields.filter((field: FieldData) =>
            requiredFields.includes((field.name as string[])[0]));

        const result = every(fields, (field: FieldData) =>
            field.errors?.length === 0 && !isNil(field.value));

        setDisabled(!result);
    }

    return (
        <DefaultLayout title={title}>
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to="/products/list" text=" Danh sách sản phẩm" />
                        <Typography.Title level={3}>THÊM SẢN PHẨM</Typography.Title>
                    </>
                }
                rightContent={<Space>{renderGroupBtn()}</Space>}
            />

            <Form
                layout="vertical"
                className="product-form"
                size="small"
                form={form}
                initialValues={product ? product : {}}
                onFieldsChange={onFieldsChange}
            >
                <Row
                    gutter={[16, 0]}
                    style={{
                        paddingLeft: theme.spacing.m,
                        paddingRight: theme.spacing.m,
                        marginTop: 28,
                    }}
                >
                    <Col span={16}>
                        <ProductFormGeneral form={form} />
                        <ProductFormSaleInfo />
                        <ProductFormProperties
                            form={form}
                            quantity={quantityWarehouse}
                            setQuantity={setQuantityWarehouse}
                        />
                    </Col>
                    <Col span={8}>
                        <ProductFormMedia setFilesImage={setFilesImage} />
                        <ProductFormDetail form={form} />
                    </Col>
                </Row>

                <Row
                    justify="end"
                    style={{
                        marginTop: 32,
                        paddingRight: theme.spacing.m,
                        paddingBottom: 72,
                    }}
                >
                    <Space>{renderGroupBtn()}</Space>
                </Row>
            </Form>
        </DefaultLayout>
    );
};

export default ProductForm;
