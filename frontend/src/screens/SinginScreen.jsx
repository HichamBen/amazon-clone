import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signin } from "../reduxSlice/userSlice";

export default function SinginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    
    const redirect = useSearchParams()[0].get("redirect"); 
    const navigate = useNavigate();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;
   
    const dispatch = useDispatch();
    function submitHandler(e) {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    useEffect(()=> {
        if(userInfo) {
            const re_redirect = redirect ? redirect : "";
            navigate(`/${re_redirect}`);
        }
        
    },[navigate,redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                    <div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="Password" placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
