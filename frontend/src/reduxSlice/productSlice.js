import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name: "action",
    initialState: {
        products: []
    },
    reducers: {
        PRODUCT_LIST_REQUEST: (state) => {
            state.loading = true;
        },
        PRODUCT_LIST_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        PRODUCT_LIST_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload;
       }
    }
});

export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } = productSlice.actions;

export const listProducts = () => async (dispatch) => {
    dispatch(PRODUCT_LIST_REQUEST());

    try {
        const { data } = await axios.get("/api/products");
        dispatch(PRODUCT_LIST_SUCCESS(data));
    } catch (err) {
        dispatch(PRODUCT_LIST_FAIL(err.message));
    }
}

export default productSlice.reducer;