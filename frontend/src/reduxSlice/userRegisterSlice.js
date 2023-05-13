import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SIGNIN_SUCCESS } from "./userSlice";

export const userRegisterReducer = createSlice({
    name: "register",
    initialState: {
    },
    reducers: {
        USER_REGISTER_REQUEST: (state) => {
            state.loading = true;
        },
        USER_REGISTER_SUCCESS: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        USER_REGISTER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} = userRegisterReducer.actions;

export const register = (name, email, password) => async (dispatch) => {
    dispatch(USER_REGISTER_REQUEST({ email, password }));
    try {
        const { data } = await axios.post("/api/users/register", { name, email, password });
        dispatch(USER_REGISTER_SUCCESS(data));
        dispatch(USER_SIGNIN_SUCCESS(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        dispatch(USER_REGISTER_FAIL(err.response && err.response.data.message ? err.response.data.message : err.message))
    }
}


export default userRegisterReducer.reducer;