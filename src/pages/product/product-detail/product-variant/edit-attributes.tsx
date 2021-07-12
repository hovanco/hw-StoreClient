import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { mongoObjectId } from '../../../../helper';
import { storeAction } from '../../../../reducers/storeState/action';

import { Modal, Card, Row, Col, Space, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { IAttribute, IProduct } from '../../../../models';
import AttributeItem from './attribute-item';
import { InsaButton, Loading } from '../../../../components';
import { DeleteOutlined } from '@ant-design/icons';
import iconActionsAddSimple from '../../../../assets/images/ic-actions-add-simple.svg';
import { omit, differenceBy } from 'lodash';
import { IProductDetailParams, IReplacedAttributeParam } from '../../interface';
import useAttributes from '../../context/use-attribute';
import useVariants from '../../context/use-variant';
import { IAttributeOption } from '../../context/interface';

import productApi from '../../../../api/product-api';
import { IState } from '../../../../store/rootReducer';

type Props = {
    form: FormInstance;
};

export const TAG_COLOR_CLASSNAME = ['background_purple', 'background_primary', 'background_gray'];

const EditAttributes: FC<Props> = ({ form }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams<IProductDetailParams>();
    const dispatch = useDispatch();

    const { data: storeObj } = useSelector((state: IState) => state.store);
    const attributeOptions: IAttribute[] = useSelector(
        (state: IState) => state.store.attributes.data
    );

    const {
        attributes,
        setAttributes,
        removeAttributesInEditMode,
        isLocalAttributeSign,
    } = useAttributes();
    const { setVariants } = useVariants();

    const [optionData, setOptionData] = useState<IAttribute[]>(attributeOptions);
    const [localAttributes, setLocalAttributes] = useState<IAttribute[]>(attributes);

    useEffect(() => {
        setLocalAttributes(attributes);
    }, [attributes]);

    useEffect(() => {
        if (attributeOptions.length && localAttributes.length) {
            let newOptionData: IAttribute[] = attributeOptions.filter(
                (attribute: IAttribute) =>
                    localAttributes.map((i: IAttribute) => i._id).indexOf(attribute._id) === -1
            );
            newOptionData = newOptionData.map((item: IAttribute) => ({
                ...item,
                [isLocalAttributeSign]: true,
            }));

            setOptionData(newOptionData);
        } else {
            setOptionData(attributeOptions);
        }
        // eslint-disable-next-line
    }, [attributeOptions, localAttributes]);

    const addNewLocalAttribute = () => {
        let newLocalAttribute = optionData[0]
            ? {
                  _id: optionData[0]._id,
                  name: optionData[0].name,
                  tags: [],
                  [isLocalAttributeSign]: true,
              }
            : {
                  _id: mongoObjectId(),
                  name: '',
                  tags: [],
                  [isLocalAttributeSign]: true,
              };

        setLocalAttributes([...localAttributes, newLocalAttribute]);
    };

    const updateLocalAttributeTag = (newLocalAttribute: IAttribute, attrIndex: number) => {
        let newLocalAttributes = localAttributes.map((attribute: IAttribute, index: number) => {
            if (attrIndex === index) return newLocalAttribute;

            return attribute;
        });

        setLocalAttributes(newLocalAttributes);
    };

    const removeLocalAttribute = (removedAttributeId: string) => {
        let newLocalAttributes = localAttributes.filter(
            (attribute: IAttribute) => attribute._id !== removedAttributeId
        );

        setLocalAttributes(newLocalAttributes);
    };

    const handleUpdateChange = async () => {
        try {
            setLoading(true);
            let localAttributesIgnoredEmpty = localAttributes.filter(
                (i: IAttribute) => i.tags.length
            );

            if (localAttributesIgnoredEmpty.length >= attributes.length) {
                let apiList: any[] = [];
                let replacedAttribute: IReplacedAttributeParam[] = [];
                let newAttributeWithNewOption: IAttribute[] = [];
                let newAttributes: IAttribute[] = [];

                localAttributesIgnoredEmpty.forEach((item: IAttributeOption, idx: number) => {
                    if (
                        !item[isLocalAttributeSign as keyof IAttributeOption] &&
                        item._id !== attributes[idx]._id
                    ) {
                        replacedAttribute.push({
                            oldId: attributes[idx]._id,
                            newId: item._id,
                            newName: item.name,
                        });

                        if (
                            attributeOptions
                                .map((i: IAttributeOption) => i._id)
                                .indexOf(item._id) === -1
                        ) {
                            newAttributeWithNewOption.push({
                                ...omit(item, [isLocalAttributeSign as string]),
                            } as IAttribute);
                        }
                    }

                    if (item[isLocalAttributeSign as keyof IAttributeOption]) {
                        newAttributes.push({
                            ...omit(item, [isLocalAttributeSign as string]),
                        } as IAttribute);

                        if (
                            attributeOptions
                                .map((i: IAttributeOption) => i._id)
                                .indexOf(item._id) === -1
                        ) {
                            newAttributeWithNewOption.push({
                                ...omit(item, [isLocalAttributeSign as string]),
                            } as IAttribute);
                        }
                    }
                });

                if (replacedAttribute.length > 0)
                    apiList.push({
                        api: productApi.replaceAttributeByNewOne,
                        data: replacedAttribute,
                    });
                if (newAttributes.length > 0)
                    apiList.push({
                        api: productApi.addAttributeProductVariants,
                        data: newAttributes,
                    });

                if (storeObj._id && params.productId) {
                    if (newAttributeWithNewOption.length) {
                        await Promise.all(
                            newAttributeWithNewOption.map((attributeWithNewOption: IAttribute) => {
                                return productApi.createAttribute(
                                    storeObj._id!,
                                    attributeWithNewOption
                                );
                            })
                        );

                        dispatch(storeAction.getAttributes(storeObj._id));
                    }

                    await Promise.all(
                        apiList.map((item: any) => {
                            return item.api(storeObj._id, params.productId, item.data);
                        })
                    )
                        .then(async () => {
                            const product: IProduct = await productApi.getProduct({
                                storeId: storeObj._id!,
                                productId: params.productId,
                            });

                            form.setFieldsValue(product);
                            product.attributes && setAttributes(product.attributes);
                            product.variants && setVariants(product.variants);

                            message.success('Cập nhật sản phẩm thành công');
                            setVisible(false);
                        })
                        .catch(() => {
                            message.error('Cập nhật sản phẩm thất bại');
                        });
                } else {
                    message.error('Cập nhật sản phẩm thất bại');
                }
            } else {
                let removedAttributeId = differenceBy(attributes, localAttributes, '_id').map(
                    (item: IAttribute) => item._id
                );

                removeAttributesInEditMode(removedAttributeId);
            }
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setVisible(false);
        setLocalAttributes(attributes);
    };

    return (
        <>
            <div onClick={() => setVisible(true)}>Chỉnh sửa thuộc tính</div>

            <Modal
                visible={visible}
                footer={null}
                onCancel={closeModal}
                wrapClassName="modal-card-content"
                closable={false}
                width={613}
            >
                <Card title="Chỉnh sửa thuộc tính" style={{ position: 'relative' }}>
                    {loading && <Loading full />}
                    <div>
                        {localAttributes.map((attribute: IAttribute | any, attrIndex: number) => (
                            <div
                                className="select-attributes-item"
                                key={`${attribute.name}_${attrIndex}`}
                            >
                                <Row gutter={[22, 0]} style={{ marginTop: 12 }}>
                                    <AttributeItem
                                        key={`attribute_${attrIndex}`}
                                        attribute={attribute}
                                        optionData={optionData}
                                        onChange={(newLocalAttribute: any) =>
                                            updateLocalAttributeTag(newLocalAttribute, attrIndex)
                                        }
                                        tagColor={TAG_COLOR_CLASSNAME[attrIndex]}
                                    />

                                    {localAttributes.length > 1 &&
                                    attribute[isLocalAttributeSign] ? (
                                        <Col className="col-actions">
                                            <InsaButton
                                                icon={<DeleteOutlined />}
                                                danger
                                                type="primary"
                                                onClick={() => removeLocalAttribute(attribute._id)}
                                            ></InsaButton>
                                        </Col>
                                    ) : (
                                        <></>
                                    )}
                                </Row>
                            </div>
                        ))}

                        {localAttributes.length < 3 ? (
                            <InsaButton
                                size="middle"
                                onClick={addNewLocalAttribute}
                                className="add-new-attribute"
                                icon={<img src={iconActionsAddSimple} alt="icon" />}
                            >
                                Thêm thuộc tính khác
                            </InsaButton>
                        ) : (
                            <></>
                        )}

                        <div className="ant-card-footer">
                            <Space>
                                <InsaButton
                                    style={{ width: 140 }}
                                    size="middle"
                                    key="help"
                                    onClick={closeModal}
                                >
                                    Huỷ
                                </InsaButton>
                                <InsaButton
                                    style={{ width: 140 }}
                                    size="middle"
                                    key="help"
                                    type="primary"
                                    onClick={handleUpdateChange}
                                    loading={loading}
                                >
                                    Cập nhật
                                </InsaButton>
                            </Space>
                        </div>
                    </div>
                </Card>
            </Modal>
        </>
    );
};

export default EditAttributes;
