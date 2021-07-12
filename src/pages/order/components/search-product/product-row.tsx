import { ExclamationCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import classNames from 'classnames';
import { flatten, get } from 'lodash';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextEllipsis } from '../../../../components';
import constants from '../../../../constants';
import formatMoney from '../../../../helper/format-money';
import useVisble from '../../../../hook/useVisible';
import { IProduct } from '../../../../models';
import { storeAction } from '../../../../reducers/storeState/action';
import { IState } from '../../../../store/rootReducer';
import { IProductState } from '../../create/state/interface';
import ProductGeneralInfo from './product-general-info';
import TableStock from './table-stock';

interface Props {
    product: IProduct;
    selectProduct: (product: IProductState) => void;
}

const ProductRow: FC<Props> = ({ product, selectProduct }) => {
    const { visible, toggle } = useVisble();

    const dispatch = useDispatch();
    const storeObj = useSelector((state: IState) => state.store.data);

    const outOfStock = !product.quantity || product.quantity === 0;

    const handleOnClick = () => {
        if (!outOfStock) {
            selectProduct({
                _id: product._id as string,
                images: product.images as string[],
                name: product.name as string,
                price: product.price as number,
                weight: product.weight || 0,
                code: product.code as string,
                count: 1,
                quantity: product.quantity as number,
                attributes: product.attributes,
            });
        }
    };

    const handleToggle = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        toggle();
    };

    const handleViewDetail = async (e: { stopPropagation: () => void }) => {
        handleToggle(e);
        dispatch(
            storeAction.getStocks({
                storeId: storeObj._id as string,
                productId: product._id,
            })
        );
    };

    const renderModal = (
        <Modal
            width="90%"
            visible={visible}
            onCancel={handleToggle}
            footer={false}
            title={
                <div className="title-custom">
                    <span>{product.name}</span>
                </div>
            }
            bodyStyle={{ padding: 0 }}
            className="modal-custom"
        >
            <Space style={{ width: '100%' }} size={18} direction="vertical">
                <ProductGeneralInfo product={product} />
                <TableStock />
            </Space>
        </Modal>
    );

    const renderNameAttributes = () => {
        if (!product.attributes || product.attributes?.length === 0) {
            return null;
        }

        const attrNames = product.attributes.map((item: any) => get(item, 'tags'));

        return <small>{flatten(attrNames).join('-')}</small>;
    };

    return (
        <div
            tabIndex={0}
            className={classNames('product-row', {
                disabled: outOfStock,
            })}
            onClick={handleOnClick}
        >
            <Row justify="space-between" align="middle" gutter={15}>
                <Col flex={3}>
                    <TextEllipsis width={70}>{product.code || '---'}</TextEllipsis>
                </Col>
                <Col flex={3} style={{ width: 200 }}>
                    <Space size={10}>
                        <Avatar
                            shape="square"
                            size={46}
                            src={
                                product.images && product.images.length > 0
                                    ? `${constants.URL_IMG}${product.images[0]}`
                                    : undefined
                            }
                            icon={<PictureOutlined />}
                        />
                        <div>
                            <div>{product.name}</div>

                            {renderNameAttributes()}
                        </div>
                    </Space>
                </Col>
                <Col flex={3} style={{ textAlign: 'center' }}>
                    {product.price ? formatMoney(product.price) : 0} đ
                </Col>

                <Col flex={3} style={{ textAlign: 'center' }}>
                    Tồn kho
                    <br />{' '}
                    <span className="quantity">
                        {product.quantity ? formatMoney(product.quantity) : 0}
                    </span>
                </Col>

                <Col flex={3} style={{ textAlign: 'right' }}>
                    <Button
                        size="small"
                        icon={<ExclamationCircleOutlined />}
                        onClick={handleViewDetail}
                    >
                        Chi tiết
                    </Button>
                </Col>
            </Row>
            {renderModal}
        </div>
    );
};

export default ProductRow;
