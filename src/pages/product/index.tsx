import React, { FC, Suspense, lazy, useEffect } from 'react';
import { Loading } from '../../components';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import notFound from '../not-found';
import './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { storeAction } from '../../reducers/storeState/action';
import { IState } from '../../store/rootReducer';

const ProductList = lazy(() => import('./product-list'));
const ProductForm = lazy(() => import('./product-new'));
const ProductDetail = lazy(() => import('./product-detail'));
const VariantDetail = lazy(() => import('./variant-detail'));

type Props = {};
const ProductPage: FC<Props> = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    const { data: storeObj } = useSelector((state: IState) => state.store);

    useEffect(() => {
        if (storeObj._id) dispatch(storeAction.getWarehouses(storeObj._id));
        //eslint-disable-next-line
    }, [storeObj._id]);

    const renderRouter = () => {
        return (
            <Switch>
                <Redirect path={`${path}`} to={`${path}/list`} exact />
                <Route path={`${path}/list`} component={ProductList} />
                <Route path={`${path}/new`} component={ProductForm} />
                <Route path={`${path}/detail/:productId/variant/:variantId`} component={VariantDetail} />
                <Route path={`${path}/detail/:productId`} component={ProductDetail} />
                <Route component={notFound} />
            </Switch>
        );
    };
    return <Suspense fallback={<Loading />}>{renderRouter()}</Suspense>;
};
export default ProductPage;
