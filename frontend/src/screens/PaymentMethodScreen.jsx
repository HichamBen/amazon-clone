import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../reduxSlice/cartSlice";

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch();

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate("/shipping")
        }
    
    }, [navigate, shippingAddress.address])
    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Payment Method</h1>
            </div>
            <div>
                <div>
                    <input
                        type="radio"
                        id="paypal"
                        value="PayPal"
                        name="paymentMethod"
                        required checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
            </div>
            <div>
                <div>
                    <input
                        type="radio"
                        id="stripe"
                        value="Stripe"
                        name="paymentMethod"
                        required
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </input>
                    <label htmlFor="stripe">Stripe</label>

                </div>
            </div>
            <div>
                <button className="primary" type="submit">
                    Continue
                </button>
            </div>


        </form>
    </div>


}