import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../reduxSlice/cartSlice";

export default function ShippingAddressScreen() {
    const navigate = useNavigate();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
   
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
   
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
   
    const dispatch = useDispatch();

    useEffect(()=> {
        if (!userInfo) {
            navigate("/signin");
        }
    },[navigate, userInfo])
   
    function submitHandler(e) {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
        navigate("/payment");
    }
    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Shipping Address</h1>
            </div>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    placeholder="Enter full name"
                    value={fullName || ""}
                    onChange={(e) => setFullName(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                    type="text"
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={postalCode || ""}
                    onChange={(e) => setPostalCode(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    placeholder="Enter country"
                    value={country || ""}
                    onChange={(e) => setCountry(e.target.value)} required></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">
                    Countinue
                </button>
            </div>
        </form>
    </div>

}