import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const orderPayReducer = createSlice({
    name: "order",
    initialState: { },
    reducers: {
        ORDER_PAY_REQUEST: (state) => {
           state.loading = true;
        },
        ORDER_PAY_SUCCESS: (state) => {
            state.loading = false;
            state.success = true;
        },
        ORDER_PAY_FAIL: (state, action) => {
             state.loading = false;
             state.error = action.payload;
        },
        ORDER_PAY_RESET: () => {
           return {};
        }
    }
});

export const {
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
} = orderPayReducer.actions;


export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch(ORDER_PAY_REQUEST({ order, paymentResult }));
    const { userSignin: { userInfo } } = getState();
    try {
        const {data} = await axios.put(`/api/orders/${order._id}/pay}`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}`}  
        });
        dispatch(ORDER_PAY_SUCCESS(data));
    } catch(err) {
        const message = err.response && err.response.data.message ? 
        err.response.data.message : err.message;
        dispatch(ORDER_PAY_FAIL(message));
    }

}

export default orderPayReducer.reducer;