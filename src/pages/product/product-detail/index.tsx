import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Form, message, Modal, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { difference, get, omit } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import productApi from '../../../api/product-api';
import { createStock } from '../../../api/stock-api';
import { uploadImagesRequest } from '../../../api/upload-api';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { IProduct, IStock } from '../../../models';
import { IState } from '../../../store/rootReducer';
import theme from '../../../theme';
import { NoProduct, ProductFormDetail, ProductFormMedia } from '../components';
import { ProductContextProvider } from '../context/context';
import { IProductDetailParams } from '../interface';
import ProductFormSaleInfo from '../components/product-form-sale-info';
import ProductFormGeneral from './product-form-general';
import ProductVariant from './product-variant';
import { ProviderProductDetail, useProductDetail } from './state/context';

const messageSucess = 'Cập nhật sản phẩm thành công';
const messageFailed = 'Cập nhật sản phẩm thất bại';

const ProductDetailContent: FC = () => {
    const { product, loading, updateProduct, setLoading, loadProduct } = useProductDetail();

    const [filesImage, setFilesImage] = useState<any[]>([]);

    const token = useSelector((state: IState) => state.auth.token);
    const storeObj = useSelector((state: IState) => state.store.data);
    const attributes = useSelector((state: IState) => state.store.attributes);

    const params = useParams<IProductDetailParams>();
    const history = useHistory();
    const [form] = useForm();

    const handleDeleteProduct = async () => {
        if (storeObj._id) {
            await productApi
                .deleteProduct(storeObj._id, params.productId)
                .then(() => {
                    history.push('/products/list');

                    message.success('Xoá sản phẩm thành công');
                })
                .catch(() => {
                    message.error('Xoá sản phẩm thất bại');
                });
        } else {
            message.error('Xoá sản phẩm thất bại');
        }
    };

    const confirmDeleteProduct = () => {
        Modal.confirm({
            title: 'Xác nhận xoá sản phẩm hiện tại?',
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                await handleDeleteProduct();
            },
            onCancel() {},
        });
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

    const updateImageProduct = (images: string[], type?: 'remove' | 'add') => {
        let formData = form.getFieldsValue();

        formData = {
            ...omit(formData, ['sku']),
        };

        formData = {
            ...formData,
            images: [...images],
        };

        productApi
            .updateProduct(storeObj._id as string, params.productId, formData)
            .then((response: IProduct) => {
                message.success(
                    type === 'remove' ? 'Đã xóa hình ảnh' : 'Cập nhật hình ảnh thành công'
                );

                updateProduct(response);
            })
            .catch(() => {
                message.error('Lỗi cập nhật hình ảnh');
            })
            .finally(() => {});
    };

    const updateDataProduct = (formData: any, callback?: () => void) => {
        productApi
            .updateProduct(storeObj._id as string, params.productId, formData)
            .then(async (response: IProduct) => {
                message.success(messageSucess);
                if (callback) {
                    callback();
                }
                setFilesImage([]);

                let stocks = form.getFieldValue('stocks');

                if (stocks && stocks.length) {
                    stocks = stocks.filter((item: IStock) => item.quantity);

                    await Promise.all(
                        stocks.map((stock: IStock) => {
                            let { quantity, warehouseId, productId } = stock;

                            return createStock({
                                storeId: storeObj._id as string,
                                warehouseId,
                                quantity,
                                productId: productId._id as string,
                            });
                        })
                    );
                    await loadProduct({
                        productId: product?._id,
                        storeId: storeObj._id,
                    });
                } else {
                    updateProduct(response);
                }
            })
            .catch(() => {
                message.error(messageFailed);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCreateAttribute = async () => {
        const formAttributes = form.getFieldValue('attributes');

        if (formAttributes) {
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
                        return productApi.createAttribute(storeObj._id as string, attributeItem);
                    })
                );
            }
        }
    };

    const handleUpdateProduct = () => {
        if (storeObj._id) {
            setLoading(true);
            let formData = form.getFieldsValue();

            formData = {
                ...omit(formData, ['sku']),
            };

            uploadImages
                .then(async (response) => {
                    await handleCreateAttribute();

                    let variantsParam = formData.variants
                        ? formData.variants.map((item: any) => ({
                              ...omit(item, [
                                  'name',
                                  'length',
                                  'width',
                                  'height',
                                  'weight',
                                  'localId',
                              ]),
                          }))
                        : undefined;

                    const images = (response as any[]).map((item: any) => item.key);
                    const productImages = product?.images || [];

                    formData = {
                        ...formData,
                        images: [...productImages, ...images],
                        variants: variantsParam,
                    };

                    updateDataProduct(formData, () => setFilesImage([]));
                })
                .catch((error) => {
                    updateDataProduct(formData);
                });
        } else {
            message.error('Cập nhật sản phẩm thất bại');
        }
    };

    if (loading) return <Loading />;

    if (!product || product.isDeleted) {
        return <NoProduct />;
    }

    return (
        <DefaultLayout title={product.name}>
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to={`/products/list${history.location.state || ''}`} text=" Danh sách sản phẩm" />
                        <Typography.Title level={3}>{product.name}</Typography.Title>
                    </>
                }
                // TODO: Show after add feature
                // rightContent={
                //     <Space>
                //         <InsaButton
                //             style={{ width: 140 }}
                //             size="middle"
                //             key="help"
                //             disabled={loading}
                //             icon={<QuestionCircleOutlined />}
                //         >
                //             Trợ giúp
                //         </InsaButton>
                //     </Space>
                // }
            />
            <Form
                layout="vertical"
                className="edit-product-form product-form"
                size="small"
                form={form}
                initialValues={product || {}}
                onFinish={updateProduct}
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
                        <ProductContextProvider form={form}>
                            <ProductVariant form={form} />
                        </ProductContextProvider>
                    </Col>
                    <Col span={8}>
                        <ProductFormMedia
                            images={product.images}
                            setFilesImage={setFilesImage}
                            updateImageProduct={updateImageProduct}
                        />
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
                    <Space>
                        <InsaButton
                            style={{ width: 140 }}
                            size="middle"
                            key="help"
                            disabled={loading}
                            type="primary"
                            danger
                            onClick={confirmDeleteProduct}
                        >
                            Xoá sản phẩm
                        </InsaButton>
                        <InsaButton
                            style={{ width: 140 }}
                            size="middle"
                            key="help"
                            disabled={loading}
                            type="primary"
                            htmlType="submit"
                            onClick={handleUpdateProduct}
                        >
                            Cập nhật
                        </InsaButton>
                    </Space>
                </Row>
            </Form>
        </DefaultLayout>
    );
};

const ProductDetail = () => {
    return (
        <ProviderProductDetail>
            <ProductDetailContent />
        </ProviderProductDetail>
    );
};

export default ProductDetail;
