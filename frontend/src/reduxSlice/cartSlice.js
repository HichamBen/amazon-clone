import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const cartReducer = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: "PayPal",
    },
    reducers: {
        CART_ADD_ITEM: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
        CART_REMOVE_ITEM: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.product !== action.payload)
        },
        CART_SAVE_SHIPPING_ADDRESS: (state, action) => {
            state.shippingAddress = action.payload;
        },
        CART_SAVE_PAYMENT_METHOD: (state, action) => {
            state.paymentMethod = action.payload
        },
        addOrderSummaryToCart: (state) => {
            const toPrice = (num) => Number(Number(num).toFixed(2));   
            state.itemsPrice = toPrice(state.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
            state.shippingPrice = state.itemsPrice > 100 ? toPrice(0) : toPrice(10);
            state.taxPrice =  toPrice(0.15 * state.itemsPrice);
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
        },
        CART_EMPTY : (state) => {
            state.cartItems = [] ;
        }
    }
});


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(CART_ADD_ITEM({
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        qty,
    }));

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch(CART_REMOVE_ITEM(productId));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(CART_SAVE_SHIPPING_ADDRESS(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(CART_SAVE_PAYMENT_METHOD(data));
}

export const {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    addOrderSummaryToCart,
    CART_EMPTY,
} = cartReducer.actions;
export default cartReducer.reducer;