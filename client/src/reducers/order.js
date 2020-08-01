import {
  ORDERS_FETCHED,
  ORDER_FETCHED,
  ORDER_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  orders: [],
  selectedOrder: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDERS_FETCHED:
      return { ...state, ...payload };
    case ORDER_FETCHED:
      return { ...state, selectedORder: payload };
    default:
      return state;
  }
};