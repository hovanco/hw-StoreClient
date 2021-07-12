import React, { FC } from 'react';

import VariantAttributes from './variant-attributes';
import VariantProperty from './variant-property';

import { FormInstance } from 'antd/lib/form/Form';

interface Props {
    form: FormInstance;
}

const VariantForm: FC<Props> = ({ form }) => {
    return (
        <>
            <VariantAttributes />
            <VariantProperty form={form} />
        </>
    );
};

export default VariantForm;
