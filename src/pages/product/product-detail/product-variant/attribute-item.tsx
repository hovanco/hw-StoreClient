import React, { FC, useState, useMemo } from 'react';
import { IAttribute } from '../../../../models';
import { mongoObjectId } from '../../../../helper';
import { useSelector } from 'react-redux';

import useAttributes from '../../context/use-attribute';
import { IAttributeOption } from '../../context/interface';

import { Col, Select, Input, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

type Props = {
    attribute: IAttributeOption | any;
    optionData: any[];
    onChange: Function;
    tagColor: string;
};

const AttributeItem: FC<Props> = ({ attribute, optionData, onChange, tagColor }) => {
    const { isLocalAttributeSign } = useAttributes();
    const [newOptionName, setNewOptionName] = useState<string>(attribute.name);
    const attributeOptions: IAttributeOption[] = useSelector(
        (state: any) => state.store.attributes.data
    );

    const selectNewAttribute = (attributeId: string) => {
        const attributeSelected: IAttributeOption[] = optionData.filter(
            (i: IAttributeOption) => i._id === attributeId
        );
        if (attributeSelected.length) {
            let { _id, name } = attributeSelected[0];

            onChange({
                _id,
                name,
                tags: attribute.tags,
                [isLocalAttributeSign]: attribute[isLocalAttributeSign] || undefined,
            });
        } else {
            onChange({
                _id: mongoObjectId(),
                name: '',
                tags: attribute.tags,
                [isLocalAttributeSign]: attribute[isLocalAttributeSign] || undefined,
            });
        }
    };

    const changeNameAttribute = (e: any) => {
        setNewOptionName(e.target.value);
    };

    const setNameNewOption = (e: any) => {
        onChange({ ...attribute, name: newOptionName });
    };

    const changeTagName = (event: any) => {
        let newTag = event.target.value;
        onChange({ ...attribute, tags: newTag.length ? [newTag] : [] });
    };

    const isNewOptionAttribute = useMemo(() => {
        return attributeOptions.map((item: IAttribute) => item._id).indexOf(attribute._id) === -1;
    }, [attribute, attributeOptions]);

    return (
        <>
            <Col span={8}>
                <Select
                    value={isNewOptionAttribute ? 'new-option' : attribute._id}
                    style={{ width: '100%' }}
                    onChange={selectNewAttribute}
                    suffixIcon={<CaretDownOutlined />}
                >
                    {!isNewOptionAttribute ? (
                        <Select.Option
                            value={attribute._id}
                            key={`attribute_option_${attribute._id}`}
                        >
                            {attribute.name}
                        </Select.Option>
                    ) : (
                        <></>
                    )}
                    {optionData.map((attrOption: any) => (
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
                {isNewOptionAttribute && (
                    <Input
                        className="new-option-name"
                        placeholder="Option name"
                        value={newOptionName}
                        onChange={changeNameAttribute}
                        onBlur={setNameNewOption}
                    />
                )}
            </Col>
            <Col span={12} className="edit-section tag-list">
                {attribute[isLocalAttributeSign] ? (
                    <Input value={attribute.tags[0]} onChange={changeTagName} />
                ) : (
                    <Space>
                        {attribute.tags.map((tag: string, tagIndex: number) => (
                            <span key={tag + tagIndex} className={`tag ${tagColor}`}>
                                {tag}
                            </span>
                        ))}
                    </Space>
                )}
            </Col>
        </>
    );
};

export default AttributeItem;
