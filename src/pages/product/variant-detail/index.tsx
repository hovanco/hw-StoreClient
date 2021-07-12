import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Form, message, Modal, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import get from 'lodash/get';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import productApi from '../../../api/product-api';
import { createStock, updateStock } from '../../../api/stock-api';
import { uploadImagesRequest } from '../../../api/upload-api';
import { BackLink, InsaButton, Loading, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import { IAttribute, IProduct, IVariant, IVariantParam } from '../../../models';
import { storeAction } from '../../../reducers/storeState/action';
import { IState } from '../../../store/rootReducer';
import { NoProduct } from '../components';
import { IEditStock, IProductVariantDetailParams } from '../interface';
import { useVariant, VariantContextProvider } from './context';
import './index.less';
import VariantForm from './variant-form';
import VariantList from './variant-list';
import VariantParentAbout from './variant-parent-about';

const VariantDetail: FC = () => {
    const [product, setProduct] = useState<IProduct>();
    const [loading, setLoading] = useState<boolean>(false);

    const { data: storeObj } = useSelector((state: IState) => state.store);
    const token = useSelector((state: IState) => state.auth.token);

    const params = useParams<IProductVariantDetailParams>();
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        variant,
        image,
        attributesToAddNew,
        setImage,
        setVariant,
        addNewVariant,
        prepareAttributesToAddNew,
    } = useVariant();

    const [form] = useForm();

    useEffect(() => {
        form.setFieldsValue(variant);
        // eslint-disable-next-line
    }, [variant]);

    useEffect(() => {
        async function loadProduct({ storeId, productId }: { storeId: string; productId: string }) {
            try {
                setLoading(true);
                const response = await productApi.getProduct({
                    storeId,
                    productId,
                });

                if (!response.attributes) {
                    history.push(`/products/detail/${productId}`);
                } else {
                    setProduct(response);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        if (storeObj._id) {
            loadProduct({
                storeId: storeObj._id,
                productId: params?.productId as string,
            });
            dispatch(storeAction.getAttributes(storeObj._id));
        }
        // eslint-disable-next-line
    }, [storeObj._id]);

    useEffect(() => {
        if (product) {
            prepareAttributesToAddNew(product.attributes || []);

            if (params.variantId !== 'new') {
                let newVariants: IVariant[] | undefined = product?.variants?.filter(
                    (item: IProduct) => item._id === params.variantId
                );

                if (newVariants?.length) {
                    setVariant(newVariants[0]);
                } else {
                    setVariant(product?.variants?.[0]);
                    history.replace(
                        `/products/detail/${product._id}/variant/${product?.variants?.[0]?._id}`
                    );
                }
            }
        }
        // eslint-disable-next-line
    }, [product]);

    useEffect(() => {
        if (params.variantId === 'new') {
            addNewVariant();
        }
        // eslint-disable-next-line
    }, [attributesToAddNew]);

    const changeSelectedVariant = (selectedVariant: IVariant) => {
        setImage(undefined);
        setVariant(selectedVariant);
        history.push(`/products/detail/${product?._id}/variant/${selectedVariant._id}`);
    };

    const createVariant = async (formData: IVariantParam, images?: string[]) => {
        try {
            const response = await productApi.createVariant(
                storeObj._id as string,
                params?.productId as string,
                {
                    ...(formData as IVariant),
                    images,
                }
            );

            history.push(`/products/detail/${params?.productId}/variant/${response._id}`);

            message.success('Tạo sản phẩm thành công');

            const productResponse = await productApi.getProduct({
                storeId: storeObj._id as string,
                productId: params?.productId as string,
            });

            setProduct(productResponse);
        } catch (error) {
            message.error('Tạo sản phẩm thất bại');
        } finally {
            setLoading(false);
        }
    };

    const updateVariant = async (formData: IVariantParam, images?: string[]) => {
        try {
            const response = await productApi.updateVariant(
                storeObj._id as string,
                params?.productId as string,
                params.variantId as string,
                { ...(formData as IVariant), images }
            );

            let newVariants = product?.variants || [];

            newVariants = newVariants.map((v: IVariant) => {
                if (v._id === response._id) return response;

                return v;
            });

            setProduct({ ...product, variants: newVariants });

            message.success('Cập nhật sản phẩm thành công');

            const updatedStock = form.getFieldValue('stocks');

            return Promise.all(
                updatedStock.map((item: IEditStock) => {
                    if (item._id === item.warehouseId)
                        return createStock({
                            storeId: storeObj._id as string,
                            productId: item.productId as string,
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
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại');
        } finally {
            setLoading(false);
        }
    };

    const uploadImages = new Promise(async (resolve, reject) => {
        if (!image) {
            if (get(variant, 'images', []).length > 0) {
                return resolve(variant.images.map((key: any) => ({ key })));
            }
            return resolve([]);
        }

        const accessToken = get(token, 'accessToken');

        const files = [(image as any).originFileObj];

        uploadImagesRequest({
            token: accessToken,
            storeId: storeObj._id as string,
            files,
        })
            .then((res) => resolve(res))
            .catch((error) => {
                resolve([]);
            })
            .finally(() => {
                setLoading(false);
            });
    });

    const saveVariant = async () => {
        let formData = await form.validateFields();

        setLoading(true);

        uploadImages
            .then(async (response) => {
                const images = (response as any[]).map((item: any) => item.key);

                if (params.variantId === 'new') {
                    await createVariant(formData, images);
                    setLoading(false);
                } else {
                    await updateVariant(formData, images);
                }
            })
            .catch(async (error) => {
                if (params.variantId === 'new') {
                    await createVariant(formData);
                } else {
                    await updateVariant(formData);
                }
            });
    };

    const confirmDeleteVariant = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn xoá sản phẩm này?',
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                await removeVariant();
            },
            onCancel() {},
        });
    };

    const removeVariant = async () => {
        try {
            setLoading(true);

            let responseStatus = await productApi.deleteVariant(
                storeObj._id as string,
                params?.productId as string,
                params.variantId as string
            );

            if (responseStatus === 200) {
                message.success('Xoá phiên bản thành công');

                let newVariants = product?.variants || [];

                newVariants = newVariants.filter((v: IVariant) => v._id !== params.variantId);

                if (newVariants.length)
                    history.push(`/products/detail/${params?.productId}/variant/${newVariants[0]._id}`);
                else history.push(`/products/detail/${params?.productId}/variant/new`);

                setProduct({ ...product, variants: newVariants });
            } else {
                message.error('Xoá phiên bản thất bại');
            }
        } catch (error) {
            message.error('Xoá phiên bản thất bại');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    if (!product) {
        return <NoProduct />;
    }

    return (
        <DefaultLayout
            title={
                product.name + ' ' + variant.attributes.map((i: IAttribute) => i.tags).join(' - ')
            }
        >
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink to={`/products/detail/${product?._id}`} text=" Chi tiết sản phẩm" />
                        <Typography.Title level={3}>
                            {variant.attributes.length ? (
                                <span>
                                    {product.name}{' '}
                                    {variant.attributes.map((i: IAttribute) => i.tags).join(' - ')}
                                </span>
                            ) : (
                                <></>
                            )}
                        </Typography.Title>
                    </>
                }
                rightContent={
                    <Space>
                        <InsaButton
                            style={{ width: 140 }}
                            onClick={() => history.push(`/products/detail/${product?._id}`)}
                        >
                            Huỷ
                        </InsaButton>
                        <InsaButton type="primary" style={{ width: 140 }} onClick={saveVariant}>
                            {params.variantId !== 'new' ? 'Cập nhật' : 'Tạo phiên bản'}
                        </InsaButton>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton style={{ width: 140 }} icon={<QuestionCircleOutlined />}>
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                }
            />

            <Row gutter={16} className="variant-detail">
                <Col span={8}>
                    <VariantParentAbout product={product} />
                    <VariantList
                        product={product}
                        onChangeSelectedVariant={changeSelectedVariant}
                    />
                </Col>
                <Col span={16}>
                    <Form layout="vertical" className="variant-form" size="small" form={form}>
                        <VariantForm form={form} />
                    </Form>
                </Col>
            </Row>

            <Row className="variant-detail" justify="end">
                <Col>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        {params.variantId !== 'new' && (
                            <InsaButton
                                style={{ width: 140 }}
                                onClick={confirmDeleteVariant}
                                type="primary"
                                danger
                            >
                                Xoá phiên bản
                            </InsaButton>
                        )}
                        <InsaButton type="primary" style={{ width: 140 }} onClick={saveVariant}>
                            {params.variantId !== 'new' ? 'Cập nhật' : 'Tạo phiên bản'}
                        </InsaButton>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton style={{ width: 140 }} icon={<QuestionCircleOutlined />}>
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                </Col>
            </Row>
        </DefaultLayout>
    );
};

const VariantDetailWithProvider = () => (
    <VariantContextProvider>
        <VariantDetail />
    </VariantContextProvider>
);

export default VariantDetailWithProvider;
