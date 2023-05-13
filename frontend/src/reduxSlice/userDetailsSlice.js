import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userDetailsReducer = createSlice({
    name: "details",
    initialState: {
        loading: true,
    },
    reducers: {
        USER_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        USER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        USER_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch(USER_DETAILS_REQUEST(userId));
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: { Authrization: `Bearer ${userInfo.token}` }
        });
        dispatch(USER_DETAILS_SUCCESS(data));
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message : err.message;
        dispatch(USER_DETAILS_FAIL(message));
    }
}

export const {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

} = userDetailsReducer.actions;



export default userDetailsReducer.reducer;
