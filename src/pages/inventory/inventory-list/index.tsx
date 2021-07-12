import React, { FC, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import theme from '../../../theme';
import { useDispatch, useSelector } from 'react-redux';

import { storeAction } from '../../../reducers/storeState/action';
import { IStoreState } from '../../../reducers/storeState/reducer';
import { InventoryTableProvider } from './context';

import { Col, Row, Select, Space, Typography } from 'antd';
import { InsaButton, PageTopWrapper } from '../../../components';
import { DefaultLayout } from '../../../layout';
import iconPlus from '../../../assets/images/ic-plus.svg';
import iconHelp from '../../../assets/images/ic-help.svg';
import InventoryTable from './table';
import InputSearch from './input-search';
import SelectWarehouse from './select-warehouse';
import AdvanceFilter from './advance-filter';
import './style.less';

const InventoryList: FC = () => {
    const dispatch = useDispatch();
    const { data: storeObj } = useSelector(({ store }: { store: IStoreState }) => store);

    useEffect(() => {
        if (storeObj._id) {
            dispatch(storeAction.getCategoriesByStore(storeObj._id));
            dispatch(storeAction.getWarehouses(storeObj._id));
        }
        // eslint-disable-next-line
    }, [storeObj._id]);

    return (
        <DefaultLayout title="QUẢN LÝ KHO">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>QUẢN LÝ KHO</Typography.Title>}
                rightContent={
                    <Space>
                        {/* TODO: Show after add feature */}
                        {/* <Link to="new">
                            <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Nhập hàng
                            </InsaButton>
                        </Link> */}
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton
                            // shape="circle"
                            icon={<img style={{ marginRight: 10 }} src={iconHelp} alt="icon" />}
                        >
                            Trợ giúp
                        </InsaButton> */}
                    </Space>
                }
            />
            <InventoryTableProvider>
                <>
                    <Row
                        justify="space-between"
                        align="middle"
                        style={{
                            height: 74,
                            paddingLeft: theme.spacing.m,
                            paddingRight: theme.spacing.m,
                        }}
                    >
                        <Col span={12}>
                            <Space size="middle">
                                <InputSearch />
                                <AdvanceFilter />
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Row justify="end">
                                <Space size="middle">
                                    <SelectWarehouse />
                                    {/* TODO: Show after add feature */}
                                    {/* <Select
                                        style={{ minWidth: 200 }}
                                        value={'root'}
                                        onChange={(value) => {}}
                                    >
                                        <Select.Option value="root">Thao tác khác</Select.Option>
                                        <Select.Option value="1">Kiểm tra tồn kho</Select.Option>
                                        <Select.Option value="2">In mã vạch</Select.Option>
                                        <Select.Option value="3">Áp dụng thuế</Select.Option>
                                        <Select.Option value="4">Xóa phiên bản</Select.Option>
                                    </Select> */}
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            paddingLeft: theme.spacing.m,
                            paddingRight: theme.spacing.m,
                        }}
                    >
                        <Col span={24}>
                            <InventoryTable />
                        </Col>
                    </Row>
                </>
            </InventoryTableProvider>
        </DefaultLayout>
    );
};
export default memo(InventoryList);
