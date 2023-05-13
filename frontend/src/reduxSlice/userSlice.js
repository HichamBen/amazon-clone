import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    USER_SIGNIN_REQUEST: state => {
      state.loading = true;
    },
    USER_SIGNIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    USER_SIGNIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    USER_SIGNOUT: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} = userReducer.actions;

export const signin = (email, password) => async dispatch => {
  dispatch(USER_SIGNIN_REQUEST({ email, password }));
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    console.log(data)
    dispatch(USER_SIGNIN_SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(
      USER_SIGNIN_FAIL(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");

  dispatch(USER_SIGNOUT());
};

export default userReducer.reducer;
