import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SIGNIN_SUCCESS } from "./userSlice";

export const userUpdateProfileReducer = createSlice({
    name: "details",
    initialState: {},
    reducers: {
        USER_UPDATE_PROFILE_REQUEST: (state) => {
            state.loading = true;
        },
        USER_UPDATE_PROFILE_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        USER_UPDATE_PROFILE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        USER_UPDATE_PROFILE_RESET: () => {
            return {}
        },
    }
});

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch(USER_UPDATE_PROFILE_REQUEST(user));
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch(USER_UPDATE_PROFILE_SUCCESS(data));
        dispatch(USER_SIGNIN_SUCCESS(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message : err.message;
        dispatch(USER_UPDATE_PROFILE_FAIL(message));
    }
}
export const {
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

} = userUpdateProfileReducer.actions;



export default userUpdateProfileReducer.reducer;
