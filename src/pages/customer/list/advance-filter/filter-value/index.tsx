import React, { FC } from 'react';

import Gender from './gender';
import CreatedAt from './created-at';
import DateOfBirth from './date-of-birth';

interface Props {
    dataKey: string;
    value: any;
    onChange: Function;
}

const FilterValue: FC<Props> = ({ dataKey, value, onChange }) => {
    switch (dataKey) {
        case 'gender':
            return <Gender value={value} onChange={onChange} />;

        case 'createdAt':
            return <CreatedAt value={value} onChange={onChange} />;

        case 'dateOfBirth':
            return <DateOfBirth value={value} onChange={onChange} />;

        default:
            return <></>;
    }
};

export default FilterValue;
