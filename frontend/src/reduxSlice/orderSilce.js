import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { CART_EMPTY } from "./cartSlice";

export const orderCreateReducer = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        ORDER_CREATE_REQUEST: (state) => {
            state.loading = true;
        },
        ORDER_CREATE_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        ORDER_CREATE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ORDER_CREATE_RESET: () => {
            return {};
        },
    }
})

export const {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
} = orderCreateReducer.actions;


export const createOrder = (order) => async (dispath, getState) => {
    dispath(ORDER_CREATE_REQUEST(order));
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post("/api/orders", order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispath(ORDER_CREATE_SUCCESS(data.order));
        dispath(CART_EMPTY());
        localStorage.removeItem("cartItems");
    } catch (err) {
        dispath(ORDER_CREATE_FAIL(err.response && err.response.data.message ? err.response.data.message : err.message));
    }
}

export default orderCreateReducer.reducer;