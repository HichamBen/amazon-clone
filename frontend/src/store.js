import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reduxSlice/productSlice";
import productDetailsReducer from "./reduxSlice/productDetailsSlice";
import cartReducer from "./reduxSlice/cartSlice";
import userSigninReducer from "./reduxSlice/userSlice";
import userRegisterReducer from "./reduxSlice/userRegisterSlice";
import orderCreateReducer from "./reduxSlice/orderSilce";
import orderDetailsReducer from "./reduxSlice/OrderDetailsSlice";
import orderPayReducer from "./reduxSlice/OrderPaySlice";
import orderMineListReducer from "./reduxSlice/OrderMineListSlice";
import userDetailsReducer from "./reduxSlice/userDetailsSlice";
import userUpdateProfileReducer from "./reduxSlice/userUpdateProfileSlice";


export default configureStore({
    reducer: {
        productList: productReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderMineList: orderMineListReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
    }
});