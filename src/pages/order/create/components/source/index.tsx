import { Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SaleChannelId } from '../../../../../models';
import { IState } from '../../../../../store/rootReducer';
import { useOrderNew } from '../../state/context';
import { EStatusPage } from '../../state/interface';

interface ISource {
    value: SaleChannelId;
    title: string;
}

const sources: ISource[] = [
    {
        value: SaleChannelId.INSAWEB,
        title: 'Website',
    },
    {
        value: SaleChannelId.POS,
        title: 'Pos',
    },
    {
        value: SaleChannelId.FACEBOOK,
        title: 'Facebook',
    },
    {
        value: SaleChannelId.SHOPEE,
        title: 'Shopee',
    },
];

interface Props {}

const Source: FC<Props> = (props) => {
    const store = useSelector((state: IState) => state.store.data);

    const { source, changeValueField, statusPage } = useOrderNew();

    const onChange = (value: SaleChannelId) => {
        changeValueField({
            field: 'source',
            value,
        });
    };

    useEffect(() => {
        if (!source) {
            const value =
                store.saleChannels && store.saleChannels.length > 0
                    ? store.saleChannels[0]
                    : undefined;

            changeValueField({
                field: 'source',
                value,
            });
        }

        // eslint-disable-next-line
    }, []);

    if (statusPage === EStatusPage.DETAIL) {
        const source_exist = sources.find((source_item) => source_item.value === source);

        if (source_exist) return <span className="text-primary">{source_exist.title}</span>;

        return <>---</>;
    }

    const saleChannels: SaleChannelId[] = store.saleChannels || [];

    return (
        <Select style={{ width: '100%' }} value={source} onChange={onChange}>
            {saleChannels.map((item) => {
                const source = sources.find((soureItem) => soureItem.value === item);

                return (
                    <Select.Option value={item} key={item}>
                        {(source as ISource).title}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default Source;
