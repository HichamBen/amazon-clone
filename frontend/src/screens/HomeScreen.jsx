import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../reduxSlice/productSlice";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const selecltor = useSelector(state => state.productList)
    const { loading, error, products } = selecltor;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {loading ? <LoadingBox />
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : <div className="row center">
                        {products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
            }

        </div>
    );
}