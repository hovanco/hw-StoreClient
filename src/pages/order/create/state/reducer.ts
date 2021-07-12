import { get, pick } from 'lodash';
import { EDeliveryDiscountBy } from '../../../../models/order';
import { EShipTypes, IAction, IProductState, IState } from './interface';
import types from './types';

const initialReducer: IState = {
    products: [],
    customer: undefined,
    infoDelivery: undefined,
    shipType: EShipTypes.SendShipping,
    warehouseId: undefined,
    shipmentFee: undefined,
    shipmentFeeForCustomer: undefined,
    discountBy: EDeliveryDiscountBy.Money,
    discount: undefined,
    noteForDelivery: undefined,
    customerNote: undefined,
    ship: undefined,
    source: undefined,
    paymentType: undefined,
    paymentMethod: undefined,
    isEdit: false,
    delivered: true,
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.INIT_STATE:
            return {
                ...state,
                ...action.payload,
            };

        case types.ADD_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        case types.ADD_PRODUCT: {
            const product_exit = state.products.find(
                (item: IProductState) => item._id === action.payload._id
            );

            const newProducts = product_exit
                ? state.products.map((product: IProductState) => {
                      if (product._id === action.payload._id)
                          return {
                              ...product,
                              count: product.count + 1,
                          };
                      return product;
                  })
                : [...state.products, action.payload];

            return {
                ...state,
                products: newProducts,
                isEdit: true,
            };
        }

        case types.REMOVE_PRODUCT: {
            const newProducts = state.products.filter(
                (product: IProductState) => product._id !== action.payload
            );

            if (newProducts.length === 0) {
                return {
                    ...state,
                    products: [],
                    ship: undefined,
                    shipmentFee: 0,
                };
            }

            return {
                ...state,
                products: newProducts,
            };
        }

        case types.UPDATE_COUNT_PRODUCT: {
            const newProducts = state.products.map((product: IProductState) => {
                if (product._id === action.payload._id) return action.payload;

                return product;
            });

            return {
                ...state,
                products: newProducts,
            };
        }

        case types.ADD_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
                infoDelivery: pick(action.payload, [
                    'name',
                    'phoneNo',
                    'address',
                    'ward',
                    'wardName',
                    'district',
                    'districtName',
                    'province',
                    'provinceName',
                ]),
            };

        case types.UPDATE_INFO_DELIVERY:
            return {
                ...state,
                infoDelivery: action.payload,
            };

        case types.REMOVE_CUSTOMER:
            return {
                ...state,
                customer: undefined,
                infoDelivery: undefined,
                ship: undefined,
                shipmentFee: 0,
            };

        case types.CHANGE_WAREHOUSE:
            return {
                ...state,
                warehouseId: action.payload,
                products: [],
            };

        case types.CHANGE_VALUE_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };

        case types.CHANGE_SHIP_TYPE: {
            return {
                ...state,
                shipType: action.payload,
                ship: action.payload === EShipTypes.SelfTransport ? undefined : state.ship,
            };
        }

        case types.CHANGE_SHIP:
            return {
                ...state,
                ship: action.payload,
                shipmentFee: get(action.payload, 'shipmentFee', 0),
            };

        case types.CHANGE_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: action.payload,
            };

        case types.CHANGE_DELIVERY:
            return {
                ...state,
                delivered: !state.delivered,
            };

        case types.RESET_NEW_ORDER:
            return {
                ...initialReducer,
                ...pick(state, ['shipType', 'warehouseId', 'source']),
            };

        default:
            return state;
    }
};

export { reducer as default, initialReducer };
