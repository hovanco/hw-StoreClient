import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findIndex } from 'lodash';

import { Modal, Card, Space, Row, Col, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import DragDropTags from './drag-drop-tag';
import { InsaButton, DragDropList, Loading } from '../../../../components';
import { IProductDetailParams } from '../../interface';
import { IAttribute } from '../../../../models';
import useAttributes from '../../context/use-attribute';
import useVariants from '../../context/use-variant';

import productApi from '../../../../api/product-api';
import { IState } from '../../../../store/rootReducer';
import { TAG_COLOR_CLASSNAME } from './edit-attributes';
import IconActionMore from './icon-action-mores';
import './sort-attributes.less';

type Props = {
    form: FormInstance;
};

const SortAttributes: FC<Props> = ({ form }) => {
    const { attributes, setAttributes } = useAttributes();
    const { setVariants } = useVariants();
    const params = useParams<IProductDetailParams>();
    const storeObj = useSelector((state: IState) => state.store.data);

    const [localAttributes, setLocalAttributes] = useState<IAttribute[]>(attributes);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLocalAttributes(attributes);
    }, [attributes]);

    const closeModal = () => setVisible(false);

    const handleTagsChange = (tagIdx: number, tags: string[]) => {
        let tempLocalAttributes = [...localAttributes];
        tempLocalAttributes[tagIdx].tags = tags;

        setLocalAttributes(tempLocalAttributes);
    };

    const handleUpdateChange = async () => {
        try {
            setLoading(true);
            if (storeObj._id) {
                await productApi
                    .changeOrderAttributesAndTags(
                        storeObj._id,
                        params.productId as string,
                        localAttributes
                    )
                    .then((response: any) => {
                        if (response.success) {
                            return productApi.getProduct({
                                storeId: storeObj._id as string,
                                productId: params?.productId as string,
                            });
                        }
                    })
                    .then((product: any) => {
                        form.setFieldsValue(product);

                        if (product.attributes) setAttributes(product.attributes);
                        if (product.variants) setVariants(product.variants);

                        message.success('C???p nh???t s???n ph???m th??nh c??ng');
                        setVisible(false);
                    });
            } else {
                message.error('C???p nh???t s???n ph???m th???t b???i');
            }
        } catch (error) {
            message.error('C???p nh???t s???n ph???m th???t b???i');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div onClick={() => setVisible(true)}>S???p x???p thu???c t??nh</div>

            <Modal
                visible={visible}
                title=""
                footer={null}
                onCancel={closeModal}
                wrapClassName="modal-card-content modal-sort-attribute"
                closable={false}
                width={600}
            >
                <Card title="S???p x???p thu???c t??nh" style={{ position: 'relative' }}>
                    {loading && <Loading full />}
                    <DragDropList
                        accepts={['attribute']}
                        className="sort-attributes"
                        dataSource={localAttributes}
                        renderItem={(localAttribute: any, idx: number) => (
                            <Row
                                className={
                                    TAG_COLOR_CLASSNAME[
                                        findIndex(attributes, ['_id', localAttribute._id])
                                    ]
                                }
                            >
                                <Col span={8}>
                                    <IconActionMore /> <span>{localAttribute.name}</span>
                                </Col>
                                <Col span={16}>
                                    <DragDropTags
                                        attribute={localAttribute}
                                        onTagsChange={(tags: string[]) =>
                                            handleTagsChange(idx, tags)
                                        }
                                    />
                                </Col>
                            </Row>
                        )}
                        onDragEnd={setLocalAttributes}
                    />

                    <div className="ant-card-footer">
                        <Space>
                            <InsaButton
                                style={{ width: 140 }}
                                size="middle"
                                key="help"
                                onClick={closeModal}
                            >
                                Hu???
                            </InsaButton>
                            <InsaButton
                                style={{ width: 140 }}
                                size="middle"
                                key="help"
                                type="primary"
                                onClick={handleUpdateChange}
                                loading={loading}
                            >
                                C???p nh???t
                            </InsaButton>
                        </Space>
                    </div>
                </Card>
            </Modal>
        </>
    );
};

export default SortAttributes;
