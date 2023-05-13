import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderMineListReducer = createSlice({
    name:"order/history",
    initialState: {
        orders: []
    },
    reducers : {
        ORDER_MINE_LIST_REQUEST : (state) => {
           state.loading = true;
        },
        ORDER_MINE_LIST_SUCCESS : (state, action) => {
           state.loading = false;
           state.orders = action.payload;
        },
        ORDER_MINE_LIST_FAIL : (state, action) => {
           state.loading = false;
           state.error = action.payload;
        }
    }
});

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch(ORDER_MINE_LIST_REQUEST());
    const { userSignin : { userInfo }} = getState();
    
    try {
        const { data } = await axios.get(`/api/orders/mine`, {
           headers: {
               Authorization: `Bearer ${userInfo.token}`,
           }, 
        });
        dispatch(ORDER_MINE_LIST_SUCCESS(data));
    } catch(err) {
        const message = err.response && err.response.data.message ? 
        err.response.data.message : err.message;
        dispatch(ORDER_MINE_LIST_FAIL(message));       
    }
}

export const {
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL
} = orderMineListReducer.actions;


export default orderMineListReducer.reducer;