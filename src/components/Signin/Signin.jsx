import React, { useState, useContext, useCallback } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { getPhotographer, logInWithEmailAndPassword, registerWithEmailAndPassword, signInWithFacebook, signInWithGoogle, authStateListener, auth } from "../../shared/firebase/firebase";

import "../Signin/signin.css"
import { UserContext } from '../../context/UserContext';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password)
            .then((res) => {
                if (res) {
                    getPhotographer(res.user.uid)
                        .then((userRes) => {
                            localStorage.setItem('user', JSON.stringify(userRes))
                            updateUser(userRes)
                            navigate(`/`)
                        })
                    // navigate(`/personal/${res.user.uid}`)
                } else {
                    console.log("user not exist");
                }
            })
    }

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signInWithGoogle()
            .then(() => {
                navigate(`/personal/${auth.currentUser.uid}`)
            })
    }

    return (
        <form className="signin">
            <h1>Đăng nhập</h1>
            <div className="signin_account">
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Nhập tên tài khoản" />
            </div>
            <div className="signin_password">
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
            </div>
            <div className="signin_noaccount">
                <div>Bạn chưa có tài khoản,
                    <Link to="/signUp" className="signin_noaccount_link"> đăng ký ngay</Link>
                </div>
            </div>
            <div className="signin_button">
                <button onClick={handleSignIn}>Đăng nhập</button>
                {/* <button onClick={handleSignInWithGoogle}>Sign in with Google</button> */}
            </div>
        </form>
    )
}

export default Signin