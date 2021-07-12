import React, { FC } from 'react';

import { ILocalFilter } from '../index';

import Status from './status';
import Category from './category';
import Brand from './brand';

interface Props {
    filter: ILocalFilter;
    onChange?: Function;
}

const RComponent: FC<Props> = ({ filter, onChange }) => {
    switch (filter.id) {
        case 'status':
            return <Status filter={filter} onChange={onChange} />;

        case 'categoryId':
            return <Category filter={filter} onChange={onChange} />;

        case 'brandId':
            return <Brand filter={filter} onChange={onChange} />;

        default:
            return <></>;
    }
};

export default RComponent;
