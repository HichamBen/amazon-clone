import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsReducer = createSlice({
    name: "order",
    initialState: { loading: true },
    reducers: {
        ORDER_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        ORDER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        ORDER_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} = orderDetailsReducer.actions;

export const detailsOrder = (orderId) => async (dispath, getState) => {
    dispath(ORDER_DETAILS_REQUEST(orderId));
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispath(ORDER_DETAILS_SUCCESS(data));
    } catch (err) {
        const message = err.response && err.response.data.message ? err.response.data.message : err.message;
        dispath(ORDER_DETAILS_FAIL(message));
    }
}

export default orderDetailsReducer.reducer;