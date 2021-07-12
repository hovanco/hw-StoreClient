import { Col, Input, List, Modal, Row, Typography } from 'antd';
import React, { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import iconChervonRight from '../../../../assets/images/ic-chervon-right.svg';
import { removeAccents } from '../../../../helper';
import { IStoreCategory } from '../../../../models';
import { IState } from '../../../../store/rootReducer';
import './style.less';

type Props = {
    visible: boolean;
    onOk: (categoryId: string) => void;
    onCancel: () => void;
};
type ListItemProps = {
    title: string;
    isActive?: boolean;
    key?: string;
};
const ListItem: FC<ListItemProps> = memo(({ title, isActive }) => (
    <List.Item className={`prod-form-cate-modal__item ${isActive ? 'active' : ''}`}>
        <Row justify="space-between" style={{ width: '100%' }}>
            <Typography.Text>{title}</Typography.Text>
            <img src={iconChervonRight} alt="icon" />
        </Row>
    </List.Item>
));

const ProductFormCategoryModal: FC<Props> = ({ visible, onOk, onCancel }) => {
    const categories = useSelector((state: IState) => state.store.categories);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [categoriesLocal, setCategoriesLocal] = useState<IStoreCategory[]>(categories || []);

    const handleEmit = () => {
        onOk(selectedCategory);
    };

    const filterCategoies = (search: string): IStoreCategory[] => {
        if (search.length > 0) {
            return categoriesLocal.filter(
                (item) =>
                    removeAccents(item.name || '')
                        .toLowerCase()
                        .indexOf(search) !== -1
            );
        }
        return categories;
    };

    const onSearch = (search: string) => {
        setCategoriesLocal(filterCategoies(search));
    };

    useEffect(() => {
        setCategoriesLocal(categories);
        return () => {};
    }, [categories]);

    return (
        <Modal
            title={
                <Typography.Title style={{ marginBottom: 0 }} level={4}>
                    Danh mục sản phẩm
                </Typography.Title>
            }
            visible={visible}
            onOk={handleEmit}
            onCancel={onCancel}
            okButtonProps={{
                size: 'middle',
                style: {
                    width: 140,
                },
            }}
            okText="Lưu"
            cancelButtonProps={{
                size: 'middle',
                style: {
                    width: 140,
                },
            }}
        >
            <Input.Search
                size="middle"
                placeholder="Tên ngành hàng"
                onSearch={onSearch}
                allowClear
            />

            <Row className="prod-form-cate-modal__row">
                <Col span={24} className="prod-form-cate-modal__col">
                    <List header={null} footer={null}>
                        {categoriesLocal.map((item, index) => (
                            <div
                                key={index.toString()}
                                onClick={() => setSelectedCategory(item._id)}
                            >
                                <ListItem
                                    title={item.name || ''}
                                    isActive={selectedCategory === item._id}
                                />
                            </div>
                        ))}
                    </List>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductFormCategoryModal;
