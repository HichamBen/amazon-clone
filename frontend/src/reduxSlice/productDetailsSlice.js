import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productDetailsSlice = createSlice({
    name: "details",
    initialState: {
        product: {}
    },
    reducers: {
        PRODUCT_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload;
        }
    }
});

export const { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = productDetailsSlice.actions;

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch(PRODUCT_DETAILS_REQUEST(productId));
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch(PRODUCT_DETAILS_SUCCESS(data));
    } catch (err) {
        const errRes = err.response && err.response.data.message ? err.response.data.message : err.message;
        dispatch(PRODUCT_DETAILS_FAIL(errRes));
    }
}

export default productDetailsSlice.reducer;