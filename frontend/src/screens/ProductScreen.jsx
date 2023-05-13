import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../reduxSlice/productDetailsSlice";

export default function ProductScreen() {
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.id;
    const dispatch = useDispatch();
    const selecltor = useSelector(state => state.productDetails);
    const { loading, product, error } = selecltor;
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    function addToCartHandler() {
        navigate(`/cart/${productId}?qty=${qty}`);
    }

    return <div>
        {loading ? <LoadingBox />
            : error ? <MessageBox variant="danger">{error}</MessageBox>
                : <div>
                    <Link to="/">Back to result</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    />
                                </li>
                                <li>Price : ${product.price}</li>
                                <li>Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div>${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? <span className="success">In Stock</span> :
                                                    <span className="danger">Unavailable</span>
                                                }
                                            </div>
                                        </div>
                                    </li>

                                    {product.countInStock > 0 && (

                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Quantity</div>
                                                    <div>
                                                        <select value={qty} onChange={(e) => {
                                                            setQty(e.target.value);
                                                        }}>

                                                            {[...Array(product.countInStock).keys()].map(item => (
                                                                <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                            </li>
                                        </>
                                    )}


                                </ul>
                            </div>
                        </div>

                    </div>
                </div>}
    </div>

}