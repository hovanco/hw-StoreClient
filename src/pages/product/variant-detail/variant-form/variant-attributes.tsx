import { Avatar, Card, Col, Form, Input, Row, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { FC, useState, useEffect } from 'react';
import imgPlaceholder from '../../../../assets/images/img-placeholder.svg';
import constants from '../../../../constants';
import { IAttribute } from '../../../../models';
import AttributeItem from './attribute-item';
import { useVariant } from '../context';

const VariantAttributes: FC = () => {
    const { variant, updateAttributeTag, setImage } = useVariant();
    const [fileImages, setFileImages] = useState<any[]>(variant.images);

    const handleChangeTag = (value: IAttribute) => {
        updateAttributeTag(value);
    };

    const onChangeUploadFile = (info: UploadChangeParam<UploadFile<any>>) => {
        const { file } = info;

        if (file) {
            const thumbUrl = window.URL.createObjectURL(file.originFileObj);
            const fileObj = {
                ...file,
                thumbUrl,
                status: 'done',
            };

            setFileImages([fileObj]);

            setImage(fileObj);
        }
    };

    useEffect(() => {
        setFileImages(variant.images);
        return () => {};
    }, [variant]);

    const getVariantImageUrl = (): string => {
        if (fileImages.length > 0) {
            if (typeof fileImages[0] === 'string') {
                return `${constants.URL_IMG}${fileImages[0]}`;
            }

            return fileImages[0].thumbUrl;
        }

        return imgPlaceholder;
    };

    return (
        <Card title="Thông tin thuộc tính">
            <Row gutter={24}>
                <Col span={16}>
                    {variant.attributes.map((attribute: IAttribute, idx: number) => (
                        <Form.Item label={attribute.name} name="attributes" key={idx}>
                            <Form.Item noStyle>
                                <AttributeItem attribute={attribute} updateAttribute={(value) => handleChangeTag(value)} />
                            </Form.Item>
                        </Form.Item>
                    ))}
                </Col>
                <Col span={8} className="attribute-image-section">
                    <Upload showUploadList={false} onChange={onChangeUploadFile}>
                        <div className="attribute-image-wrapper">
                            <Avatar src={getVariantImageUrl()} shape={'square'} size={96} />
                            <span>Thay đổi ảnh</span>
                        </div>
                    </Upload>
                </Col>
            </Row>
        </Card>
    );
};

export default VariantAttributes;
