import { Col, Input, Select, Space, Typography } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import iconClose from '../../../../../assets/images/ic-close.svg';
import { IAttribute } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { IAttributeOption } from '../../../context/interface';
import useAttributes from '../../../context/use-attribute';

type Props = {
    attribute: IAttributeOption;
};

const AttributeItem: FC<Props> = ({ attribute }) => {
    const { attributeOptions, changeAttribute, isLocalAttributeSign, updateAttribute } =
        useAttributes();

    const [newOptionName, setNewOptionName] = useState<string>(attribute.name);
    const listAttribute: IAttribute[] = useSelector((state: IState) => state.store.attributes.data);

    const suggestTags = useMemo(() => {
        return listAttribute.filter((i) => attribute._id === i._id)[0]?.tags || [];
    }, [attribute, listAttribute]);

    const selectNewAttribute = (attributeId: string) => changeAttribute(attribute, attributeId);

    const changeAttributeTags = (tags: string[]) => updateAttribute({ ...attribute, tags });

    const addTag = (tag: string) => {
        if (attribute.tags.includes(tag)) return;

        let newTags = attribute.tags ? [...attribute.tags] : [];
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
            <Col span={6}>
                <Select defaultValue={attribute._id} onChange={selectNewAttribute}>
                    <Select.Option value={attribute._id} key={`attribute_option_${attribute._id}`}>
                        {attribute.name || 'New option'}
                    </Select.Option>
                    {attributeOptions.map((attrOption: IAttribute) => (
                        <Select.Option
                            value={attrOption._id}
                            key={`attribute_option_${attrOption._id}`}
                        >
                            {attrOption.name}
                        </Select.Option>
                    ))}
                    <Select.Option value={'new-option'} key={`attribute_option_new_option`}>
                        New option
                    </Select.Option>
                </Select>
                {attribute[isLocalAttributeSign as keyof IAttributeOption] && (
                    <Input
                        className='new-option-name'
                        placeholder='Option name'
                        value={newOptionName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewOptionName(e.target.value)
                        }
                        onBlur={() => updateAttribute({ ...attribute, name: newOptionName })}
                    />
                )}
            </Col>
            <Col span={14}>
                <Select
                    mode='tags'
                    onChange={changeAttributeTags}
                    placeholder='Please select'
                    value={attribute.tags}
                    className='prod-form-properties__select'
                    dropdownStyle={{ display: 'none' }}
                    tagRender={({ label }) => (
                        <Space className='prod-form-properties__tag'>
                            <Typography.Text>{label}</Typography.Text>
                            <img
                                src={iconClose}
                                alt=''
                                onClick={() => removeTag(label as string)}
                            />
                        </Space>
                    )}
                ></Select>

                {suggestTags.length ? (
                    <div className='suggest-tags'>
                        <span>Nhãn đã có: </span>
                        <span className='tag-list'>
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
