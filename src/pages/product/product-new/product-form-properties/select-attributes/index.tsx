import React, { FC } from 'react';

import { Row, Col, Typography, Form } from 'antd';
import { InsaButton } from '../../../../../components';
import theme from '../../../../../theme';
import AttributeItem from './attribute-item';
import iconTrashWhite from '../../../../../assets/images/ic-trash-white.svg';
import iconActionsAddSimple from '../../../../../assets/images/ic-actions-add-simple.svg';
import useAttributes from '../../../context/use-attribute';

import './index.less';

interface Props {}

const SelectAttributes: FC<Props> = () => {
    const { attributes, addAttribute, removeAttribute } = useAttributes();

    return (
        <div className="select-attributes">
            <Form.Item name="attributes" noStyle>
                <Row gutter={[22, 0]} style={{ marginTop: theme.spacing.xs }}>
                    <Col span={6}>
                        <Typography.Text>
                            <b>Tên thuộc tính</b>
                        </Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text>
                            <b>Giá trị</b>
                        </Typography.Text>
                    </Col>
                </Row>
                {attributes.map((attribute: any, attributeIndex: number) => (
                    <div
                        className="select-attributes-item"
                        key={`${attribute.name}_${attributeIndex}`}
                    >
                        <Row gutter={[22, 0]} style={{ marginTop: 12 }}>
                            <AttributeItem attribute={attribute} />
                            <Col className="col-remove-attribute">
                                {attributes.length > 1 ? (
                                    <InsaButton
                                        icon={<img alt="icon" src={iconTrashWhite} />}
                                        danger
                                        type="primary"
                                        onClick={() => removeAttribute(attributeIndex)}
                                    ></InsaButton>
                                ) : (
                                    <></>
                                )}
                            </Col>
                        </Row>
                    </div>
                ))}
                {attributes.length < 3 ? (
                    <InsaButton
                        size="middle"
                        onClick={addAttribute}
                        className="add-new-attribute"
                        icon={<img src={iconActionsAddSimple} alt="icon" />}
                    >
                        Thêm thuộc tính khác
                    </InsaButton>
                ) : (
                    <></>
                )}
            </Form.Item>
        </div>
    );
};

export default SelectAttributes;
