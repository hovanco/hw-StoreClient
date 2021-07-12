import React, { FC } from 'react';
import SelectStatusOrder from '../components/select-status-order';
import { useOrdersContext } from './state/context';

interface Props {
    status?: string;
}

const StatusSelect: FC<Props> = ({ status }) => {
    const { changeStatus } = useOrdersContext();

    const handleSelectStatus = (status?: string) => {
        changeStatus(status);
    };

    return <SelectStatusOrder selectStatusOrder={handleSelectStatus} status={status} />;
};

export default StatusSelect;
