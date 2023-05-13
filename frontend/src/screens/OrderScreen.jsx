import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PayPalBtn from "../components/PayPalBtn";
import { detailsOrder } from "../reduxSlice/OrderDetailsSlice";
import { ORDER_PAY_RESET, payOrder } from "../reduxSlice/OrderPaySlice";

export default function OrderScreen() {
    const orderId = useParams().id;
    const [sdkReady, setSdkReady] = useState(false);
    const [clientId, setclientId] = useState();
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get("/api/config/paypal");
            setclientId(data);
            setSdkReady(true);
        }
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch(ORDER_PAY_RESET())
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    function successPaymentHandler(paymentResult) {
        dispatch(payOrder(order, paymentResult))
    }
    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (<div>
                <h1>Order {order._id}</h1>
                <div className="row top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                        : <MessageBox variant="danger">Not Delivered</MessageBox>}
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                        : <MessageBox variant="danger">Not Paid</MessageBox>}
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Order Items</h2>
                                    <ul>
                                        {order.orderItems.map(item => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>{item.qty} x ${item.price} = ${item.qty * item.price} </div>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Items</div>
                                        <div>${parseFloat(order.itemsPrice).toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>${parseFloat(order.shippingPrice).toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>${parseFloat(order.taxPrice).toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>${parseFloat(order.totalPrice).toFixed(2)}</strong></div>
                                    </div>
                                </li>
                                {
                                    !order.isPaid && (
                                        <li>
                                            {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                                (<>
                                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                    {loadingPay && <LoadingBox></LoadingBox>}
                                                    <PayPalBtn
                                                        clientId={clientId}
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    ></PayPalBtn>
                                                </>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>)
}