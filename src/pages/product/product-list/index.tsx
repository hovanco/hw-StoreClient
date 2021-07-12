import { CaretDownOutlined } from '@ant-design/icons';
import { Checkbox, Col, Dropdown, Input, Modal, Row, Select, Space, Typography, message, Menu } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { debounce, isNil, omit } from 'lodash';
import * as queryString from 'query-string';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import productApi from '../../../api/product-api';
import iconDownload from '../../../assets/images/ic-download.svg';
import iconPlus from '../../../assets/images/ic-plus.svg';
import iconUpload from '../../../assets/images/ic-upload.svg';
import { InsaButton, InsaTable, PageTopWrapper } from '../../../components';
import formatMoney from '../../../helper/format-money';
import { DefaultLayout } from '../../../layout';
import { IProduct } from '../../../models';
import { storeAction } from '../../../reducers/storeState/action';
import { IStoreState } from '../../../reducers/storeState/reducer';
import { IState } from '../../../store/rootReducer';
import theme from '../../../theme';
import ProductColumnName from '../product-column-name';
import '../style.less';

const ProductList: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state: IState) => state.global.isCollapsed);
    const { data: storeObj, product, categories } = useSelector(
        ({ store }: { store: IStoreState }) => store
    );
    const { data: productList, loading, pagination } = product;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [path, setPath] = useState(history.location.search);

    const [loadingRemoveProducts, setLoadingRemoveProducts] = useState<boolean>(false);
    const [widthTable, setWidthTable] = useState<number>(0);

    const filterState: {
        categoryId?: string;
        search?: string;
    } = queryString.parse(history.location.search);

    useEffect(() => {
        setPath(history.location.search)
    }, [history.location.search])

    const columns: ColumnType<any>[] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 340,
            align: 'center',
            render: (text: string, record: any) => (
                <ProductColumnName
                    text={text}
                    onClick={() => history.push(`/products/detail/${record._id}`)}
                    product={record}
                />
            ),
        },
        {
            title: 'Mã sản phẩm',
            className: 'column-money',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
        },
        {
            title: 'Số lượng',
            key: '_id',
            align: 'center',
            render: (product: IProduct) => {
                if (product.isVariant) {
                    return <span>{product.quantity}</span>
                } else {
                    const totalQuantity = (product.variants || [])
                        .reduce((total, { quantity }) => total + (quantity || 0), 0);
                    return <span>{totalQuantity}</span> 
                }
            },
        },
        {
            title: 'Đơn giá',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            align: 'center',
            render: (text: string) =>
                text ? (
                    <Typography.Text className="product-tbl__text-round">
                        {formatMoney(text)} đ
                    </Typography.Text>
                ) : (
                    <></>
                ),
        },
    ];

    const fetchDataCallback = (currentFilterState?: { categoryId?: string; search?: string }) => {
        const _filterState = isNil(currentFilterState) ? filterState : currentFilterState;
        if (storeObj._id) {
            dispatch(
                storeAction.getProduct({
                    id: storeObj._id,
                    limit,
                    page,
                    categoryId: _filterState.categoryId as string,
                    search: _filterState.search as string,
                    withQuantity: true,
                })
            );
        }
    };

    const fetchDataDebounce = debounce(fetchDataCallback, 500);

    const changeTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextFilterState = { ...filterState, search: e.target.value };

        history.push({
            search: queryString.stringify(nextFilterState),
        });
    };

    const handleSearch = async (value: string) => {
        const nextFilterState = { ...filterState, search: value };
        await setPage(1);
        fetchDataDebounce(nextFilterState);
    };

    const handleSelectCategory = async (id: string): Promise<void> => {
        let nextFilterState = filterState;
        if (id === 'root') {
            nextFilterState = omit(nextFilterState, 'categoryId');
        } else {
            nextFilterState.categoryId = id;
        }

        history.push({
            search: queryString.stringify(nextFilterState),
        });
        await setPage(1);
        fetchDataCallback(nextFilterState);
    };

    const onChangPagination = (pageNumber: number, pageSize?: number) => {
        setPage(pageNumber);
        setLimit(pageSize || 20);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    const onSelectChange = (selectedRowKeysInCurrentPage: any) => {
        let selectedRowKeysBeforeInCurrentPage: string[] =[];  
        productList.forEach(product => {
            if (selectedRowKeys.includes(product._id)) {
                selectedRowKeysBeforeInCurrentPage.push(product._id);
            }
        });

        const selectedRowInOtherPage = selectedRowKeys
            .filter((key: string) => !selectedRowKeysBeforeInCurrentPage.includes(key));

        setSelectedRowKeys([...selectedRowInOtherPage, ...selectedRowKeysInCurrentPage]);
    };

    const selectAll = () => {
        const productKeys = productList.map((product: IProduct) => product._id);
        setSelectedRowKeys(productKeys);
    };

    const removeAllSelect = () => {
        setSelectedRowKeys([]);
    };

    const removeOrderSelect = () => {
        Modal.confirm({
            title: 'Xóa Sản Phẩm?',
            content: `Bạn chắc chắn muốn xóa sản phẩm?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',

            onOk() {
                if (storeObj._id) {
                    setLoadingRemoveProducts(true);
                    Promise.all(
                        selectedRowKeys.map(async (productId: string) => {
                            await productApi.deleteProduct(
                                storeObj._id as string,
                                productId,
                            );

                            return true;
                        })
                    )
                        .then(() => {
                            message.success(`Đã xóa ${selectedRowKeys.length} sản phẩm`);
                            setSelectedRowKeys([]);
                            fetchDataCallback(filterState);
                        })
                        .catch((error) => {
                            message.error('Lỗi xóa sản phẩm');
                        })
                        .finally(() => {
                            setLoadingRemoveProducts(false);
                        });
                }
            },
        });
    };

    function handleMenuClick(e: any) {
        switch (e.key) {
            case 'remove':
                removeOrderSelect();
                break;
            case 'unselect':
                setSelectedRowKeys([]);
                break;
            default:
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">Xóa sản phẩm</Menu.Item>
            <Menu.Item key="unselect">Bỏ chọn</Menu.Item>
        </Menu>
    );

    const renderColumnTitle = () => {
        if (selectedRowKeys.length === 0) {
            return <Checkbox onClick={selectAll} />;
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                    zIndex: 100,
                    width: widthTable,
                }}
            >
                <Dropdown.Button
                    overlay={menu}
                    buttonsRender={([leftButton, rightButton]) => [
                        leftButton,
                        React.cloneElement(rightButton as ReactElement, {
                            children: (
                                <>
                                    Chọn thao tác <CaretDownOutlined />
                                </>
                            ),
                            loading: loadingRemoveProducts,
                            icon: undefined,
                        }),
                    ]}
                >
                    <Space>
                        <Checkbox onClick={removeAllSelect} checked />
                        <span>Đã chọn {selectedRowKeys.length} sản phẩm</span>
                    </Space>
                </Dropdown.Button>
            </div>
        );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: <div style={{ width: 30 }}>{renderColumnTitle()}</div>,
    };

    useEffect(() => {
        if (storeObj._id) {
            fetchDataDebounce();
            dispatch(storeAction.getCategoriesByStore(storeObj._id));
        }
        // eslint-disable-next-line
    }, [storeObj._id, page, limit]);

    useEffect(() => {
        const antTableHeadEle: HTMLTableHeaderCellElement | null = document?.querySelector(
            '.product-tbl .ant-table-thead'
        );
        let productActionsWidth: number = antTableHeadEle ? antTableHeadEle.clientWidth : 0;

        setWidthTable(productActionsWidth);
    }, [selectedRowKeys]);

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            setWidthTable(isCollapsed ? widthTable + 120 : widthTable - 120);
        }
    }, [isCollapsed]);

    const headerTableProduct = (
        <Space size="middle">
            <Input.Search
                key="search"
                placeholder="Tìm kiếm sản phẩm"
                onChange={changeTextSearch}
                onSearch={handleSearch}
                style={{ width: 330 }}
                value={filterState.search || ''}
                allowClear
            />
            <Select
                style={{ minWidth: 200 }}
                value={filterState.categoryId || 'root'}
                onChange={handleSelectCategory}
            >
                <Select.Option value="root">Lọc sản phẩm</Select.Option>
                {categories.map((cate) => (
                    <Select.Option key={cate._id} value={cate._id}>
                        {cate.name}
                    </Select.Option>
                ))}
            </Select>
        </Space>
    );

    return (
        <DefaultLayout title="Danh sách sản phẩm">
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>}
                rightContent={
                    <Space>
                        <Link to="new">
                            <InsaButton
                                type="primary"
                                icon={<img style={{ marginRight: 10 }} src={iconPlus} alt="icon" />}
                            >
                                Thêm sản phẩm
                            </InsaButton>
                        </Link>
                        {/* TODO: Show after add feature */}
                        {/* <InsaButton shape="circle" icon={<ExclamationOutlined />} /> */}
                    </Space>
                }
            />

            {/* TODO: Show after add feature */}
            {/* <Row justify="end" align="middle" style={{ height: 74, paddingRight: theme.spacing.m }}>
                <Space>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconDownload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Nhập file</Typography.Text>
                    </InsaButton>
                    <InsaButton
                        icon={<img style={{ marginRight: 10 }} src={iconUpload} alt="icon" />}
                    >
                        <Typography.Text type="secondary">Xuất file</Typography.Text>
                    </InsaButton>
                </Space>
            </Row> */}

            <Row
                style={{
                    padding: theme.spacing.m,
                }}
            >
                <Col span={24}>
                    <InsaTable
                        name="Danh sách sản phẩm"
                        loading={loading}
                        columns={columns}
                        isShowTotal
                        rowKey="_id"
                        rowSelection={rowSelection}
                        dataSource={productList.map((e) => ({
                            ...e,
                            key: e._id,
                        }))}
                        pagination={{
                            pageSize: limit,
                            current: page,
                            total: pagination.total,
                            onChange: onChangPagination,
                        }}
                        bordered
                        hasDefaultColumn={false}
                        className="product-tbl"
                        headerExtend={headerTableProduct}
                        onRow={(record) => {
                            return {
                                onClick: (event) => {
                                    history.push(`/products/detail/${(record as IProduct)._id}`, path);
                                },
                            };
                        }}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default ProductList;
