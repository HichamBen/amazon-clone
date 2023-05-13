import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileScreen from "../screens/ProfileScreen";

export default function PrivateRoute() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return userInfo ? <ProfileScreen></ProfileScreen>
            :
            <Navigate to="/signin"></Navigate>

}