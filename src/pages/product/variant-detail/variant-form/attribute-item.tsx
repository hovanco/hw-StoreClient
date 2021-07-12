import React, { FC, useMemo } from 'react';
import { IAttribute } from '../../../../models';
import { useSelector } from 'react-redux';
import { IAttributeOption } from '../../context/interface';
import { Col, Typography, Select, Space } from 'antd';
import { IState } from '../../../../store/rootReducer';
import iconClose from '../../../../assets/images/ic-close.svg';
import './style.less';

type Props = {
    attribute: IAttributeOption;
    updateAttribute: (value: IAttribute) => void;
};

const AttributeItem: FC<Props> = ({ attribute, updateAttribute }) => {

    const listAttribute: IAttribute[] = useSelector((state: IState) => state.store.attributes.data);

    const suggestTags = useMemo(() => {
        return listAttribute.filter((i) => attribute._id === i._id)[0]?.tags || [];
    }, [attribute, listAttribute]);

    const changeAttributeTags = (tags: string[]) => updateAttribute({ ...attribute, tags });

    const addTag = (tag: string) => {
        if (attribute.tags.includes(tag)) return;

        let newTags = [];
        newTags.push(tag);

        changeAttributeTags([...newTags]);
    };

    const removeTag = (tag: string) => {
        if (!attribute.tags.includes(tag)) return;

        let newTags = attribute.tags ? [...attribute.tags] : [];
        newTags = newTags.filter((item: string) => item !== tag);

        changeAttributeTags([...newTags]);
    };

    return (
        <>
            <Col span={24} className='select-attributes'>
                <Select
                    mode="tags"
                    onChange={changeAttributeTags}
                    placeholder="Please select"
                    value={attribute.tags}
                    className="prod-form-properties__select"
                    dropdownStyle={{ display: 'none' }}
                    tagRender={({ label }) => (
                        <Space className="prod-form-properties__tag">
                            <Typography.Text>{label}</Typography.Text>
                            <img
                                src={iconClose}
                                alt=""
                                onClick={() => removeTag(label as string)}
                            />
                        </Space>
                    )}
                ></Select>

                {suggestTags.length ? (
                    <div className="suggest-tags">
                        <span>Nhãn đã có: </span>
                        <span className="tag-list">
                            {suggestTags.map((tag: string, idx: number) => (
                                <span
                                    key={`suggest-tag-${idx}`}
                                    className={`tag${
                                        attribute.tags.includes(tag) ? ' disabled' : ''
                                    }`}
                                    onClick={() => addTag(tag)}
                                >
                                    {tag}
                                </span>
                            ))}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
            </Col>
        </>
    );
};

export default AttributeItem;
