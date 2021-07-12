import { debounce } from 'lodash';
import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import customerApi from '../../../../api/customer-api';
import SearchDropdown from '../../../../components/search-dropdown';
import { ICustomer } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import Customers from './customers';
import InputSearch from './input-search';
import './search-product.less';
import ProviderSearchCustomer from './context';
import { useOrderNew } from '../../create/state/context';
import { guest } from '../../../../constants/guest';
import { EShipTypes } from '../../create/state/interface';

interface Props {
    selectCustomer: (customer: ICustomer) => void;
}

const SearchCustomer: FC<Props> = ({ selectCustomer }) => {
    const store = useSelector((state: IState) => state.store.data);

    const { shipType, customer, removeCustomer } = useOrderNew();

    const [loading, setLoading] = useState<boolean>(false);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [optionGuest, setOptionGuest] = useState<boolean>(true);

    const onChange = debounce((textString?: string) => {
        if (!textString && shipType === EShipTypes.SelfTransport) {
            setOptionGuest(true);
        } else {
            setOptionGuest(false);
        }

        if (store._id) {
            setLoading(true);

            customerApi
                .getCustomers({
                    storeId: store._id,
                    page: 1,
                    limit: 10,
                    search: textString,
                })
                .then((res: any) => {
                    setCustomers(res.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, 500);

    useEffect(() => {
        if (shipType === EShipTypes.SendShipping) {
            if (customer?._id === guest._id) {
                removeCustomer();
            }
        }
        onChange();
    }, [shipType]);

    return (
        <ProviderSearchCustomer selectCustomer={selectCustomer}>
            <SearchDropdown className="search-customer" input={<InputSearch onChange={onChange} />}>
                <Customers
                    customers={customers}
                    loading={loading}
                    optionGuest={optionGuest}
                />
            </SearchDropdown>
        </ProviderSearchCustomer>
    );
};

export default SearchCustomer;
