import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalBtn(props) {
    return <PayPalScriptProvider options={{ "client-id": props.clientId }}>
    <PayPalButtons
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: props.amount,
                        },
                    },
                ],
            });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
                props.onSuccess(details);
            });
        }}
    />
    </PayPalScriptProvider>
}
